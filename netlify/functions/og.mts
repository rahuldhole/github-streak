import { initWasm, Resvg } from '@resvg/resvg-wasm'
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Config, Context } from '@netlify/functions'

const currentDir = dirname(fileURLToPath(import.meta.url))

let wasmInitialized = false
let fontBuffers: Uint8Array[] = []

let iconFire = ''
let iconTrophy = ''
let iconSparkles = ''

async function ensureInit() {
  if (wasmInitialized) return

  // Load WASM from the npm package
  const wasmPath = join(currentDir, '..', '..', 'node_modules', '@resvg', 'resvg-wasm', 'index_bg.wasm')
  let wasmBuf: ArrayBuffer

  try {
    wasmBuf = readFileSync(wasmPath).buffer
  } catch {
    // Fallback: fetch from CDN if bundled path doesn't resolve
    const res = await fetch('https://unpkg.com/@resvg/resvg-wasm@2.6.2/index_bg.wasm')
    if (!res.ok) throw new Error('Failed to fetch WASM binary')
    wasmBuf = await res.arrayBuffer()
  }

  // Load bundled fonts
  const assetsDir = join(currentDir, 'assets')
  try {
    const bold = readFileSync(join(assetsDir, 'Roboto-Bold.ttf'))
    const regular = readFileSync(join(assetsDir, 'Roboto-Regular.ttf'))
    fontBuffers = [new Uint8Array(bold.buffer), new Uint8Array(regular.buffer)]
  } catch {
    // Fallback: fetch from Google Fonts
    const fontRes = await fetch('https://github.com/googlefonts/roboto-2/raw/main/src/hinted/Roboto-Bold.ttf')
    if (fontRes.ok) {
      fontBuffers = [new Uint8Array(await fontRes.arrayBuffer())]
    }
  }

  // Load icons
  try {
    iconFire = readFileSync(join(currentDir, '..', '..', 'public', 'assets', 'icons', 'fire.png')).toString('base64')
    iconTrophy = readFileSync(join(currentDir, '..', '..', 'public', 'assets', 'icons', 'trophy.png')).toString('base64')
    iconSparkles = readFileSync(join(currentDir, '..', '..', 'public', 'assets', 'icons', 'sparkles.png')).toString('base64')
  } catch (err) {
    console.error('Failed to load icons', err)
  }

  await initWasm(wasmBuf)
  wasmInitialized = true
}

/**
 * Inline external <image href="https://..."> as base64 data URIs.
 * resvg cannot fetch external URLs, so we must inline them.
 */
async function inlineExternalImages(svg: string): Promise<string> {
  const imageRegex = /href="(https?:\/\/[^"]+)"/g
  const matches = [...svg.matchAll(imageRegex)]

  for (const match of matches) {
    try {
      const res = await fetch(match[1])
      if (res.ok) {
        const buf = await res.arrayBuffer()
        const base64 = Buffer.from(buf).toString('base64')
        const contentType = res.headers.get('content-type') || 'image/jpeg'
        svg = svg.replace(match[1], `data:${contentType};base64,${base64}`)
      }
    } catch {
      // Skip failed image fetches — avatar will just be missing
    }
  }

  return svg
}

/**
 * Replace emoji characters with PNG icons.
 */
function replaceEmoji(svg: string): string {
  let res = svg
  if (iconFire) {
    res = res.replace(/<text y="28" class="stat">🔥\s*/g, `<image href="data:image/png;base64,${iconFire}" x="0" y="11" width="20" height="20" /><text y="28" x="24" class="stat">`)
    // Inject the footer fire icon outside of the <text> element (resvg ignores <image> inside <text>)
    res = res.replace(/<g transform="translate\(600, 585\)">/, `<g transform="translate(600, 585)"><image href="data:image/png;base64,${iconFire}" x="-95" y="-18" width="22" height="22" />`)
  }
  if (iconTrophy) {
    res = res.replace(/<text y="28" class="stat">🏆\s*/g, `<image href="data:image/png;base64,${iconTrophy}" x="0" y="11" width="20" height="20" /><text y="28" x="24" class="stat">`)
  }
  if (iconSparkles) {
    res = res.replace(/<text y="28" class="stat">✨\s*/g, `<image href="data:image/png;base64,${iconSparkles}" x="0" y="11" width="20" height="20" /><text y="28" x="24" class="stat">`)
  }
  // Fallbacks for any remaining emojis
  return res.replace(/🔥/g, '').replace(/🏆/g, '').replace(/✨/g, '')
}

export default async (req: Request, context: Context) => {
  const url = new URL(req.url)
  const username = context.params?.username
  const theme = url.searchParams.get('theme') || 'dark'

  if (!username || !/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(username)) {
    return new Response('Invalid or missing username', { status: 400 })
  }

  try {
    await ensureInit()

    // Fetch the share SVG from our own edge function
    const siteUrl = url.origin
    const svgUrl = `${siteUrl}/profile-svg/${encodeURIComponent(username)}?theme=${encodeURIComponent(theme)}`
    const svgRes = await fetch(svgUrl)

    if (!svgRes.ok) {
      console.error(`SVG fetch failed: ${svgRes.status} ${svgRes.statusText}`)
      return new Response(null, {
        status: 302,
        headers: { Location: `${siteUrl}/og.png` },
      })
    }

    let svgString = await svgRes.text()

    // Pre-process SVG for rasterization
    svgString = await inlineExternalImages(svgString)
    svgString = replaceEmoji(svgString)

    const resvg = new Resvg(svgString, {
      fitTo: { mode: 'width', value: 1200 },
      font: {
        fontBuffers: fontBuffers,
        loadSystemFonts: false,
        defaultFontFamily: 'Roboto',
      },
    })

    const pngData = resvg.render()
    const pngBuffer = pngData.asPng()

    return new Response(pngBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
        'Netlify-CDN-Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600',
        'Vary': 'Accept',
      },
    })
  } catch (err) {
    console.error('OG image generation failed:', err)

    // Fallback: redirect to static OG image
    const siteUrl = process.env.DEPLOY_PRIME_URL || url.origin
    return new Response(null, {
      status: 302,
      headers: { Location: `${siteUrl}/og.png` },
    })
  }
}

export const config: Config = {
  path: '/og/:username',
}
