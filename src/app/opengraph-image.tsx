import { ImageResponse } from 'next/og'

async function getConfigs(){
	const res = await fetch(`https://api.airtable.com/v0/appmUcMkz92HvN9gi/configs?sort%5B0%5D%5Bfield%5D=id&sort%5B0%5D%5Bdirection%5D=asc`, {
		headers: {
			'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_KEY}`
		}
	})

	if(!res.ok){
		throw new Error('Failed to fetch data')
	}

	return res.json()
}

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = 'About Acme'
export const size = {
	width: 1200,
	height: 630,
}

export const contentType = 'image/png'

// Image generation
export default async function Image() {
	const data = await getConfigs()

	const title = data?.records?.find((r: any) => r.fields.title === 'main_title')?.fields.value
	const avatar = data?.records?.find((r: any) => r.fields.title === 'main_avatar')?.fields.value

	// Font
	const fontBold = fetch(
		new URL('@/fonts/Caladea/Caladea-Bold.ttf', import.meta.url)
	).then((res) => res.arrayBuffer())

	return new ImageResponse(
		(
			// ImageResponse JSX element
			<div
				style={{
					background: '#0b8518',
					width: '100%',
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: 50,
						alignItems: 'center',
						justifyContent: 'center',
						textAlign: 'center',
						color: '#fff'
					}}
				>
					<img
						alt={'avatar'}
						src={avatar || 'https://github.com/shadcn.png'}
						style={{
							width: 300,
							height: 300,
							borderRadius: '50%'
						}}
					/>
					<h2
						style={{
							fontSize: 80,
							margin: 0,
							padding: 0
						}}
					>
						{title || 'Vinh Web'}
					</h2>
				</div>

			</div>
		),
		// ImageResponse options
		{
			// For convenience, we can re-use the exported opengraph-image
			// size config to also set the ImageResponse's width and height.
			...size,
			fonts: [
				{
					name: 'Caladea',
					data: await fontBold,
					style: 'normal',
					weight: 400,
				},
			],
		}
	)
}
