import HomePage from "@/modules/HomePage";
import {Metadata} from "next";

async function getLinks(){
	const res = await fetch(`https://api.airtable.com/v0/appmUcMkz92HvN9gi/links?sort%5B0%5D%5Bfield%5D=id&sort%5B0%5D%5Bdirection%5D=asc`, {
		headers: {
			'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_KEY}`
		}
	})

	if(!res.ok){
		throw new Error('Failed to fetch data')
	}

	return res.json()
}

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

export async function generateMetadata(): Promise<Metadata> {
	const data = await getConfigs()

	const title = data?.records?.find((r: any) => r.fields.title === 'site_title')?.fields.value
	const description = data?.records?.find((r: any) => r.fields.title === 'site_description')?.fields.value

	return {
		title: title || 'Vinh Web',
		description: description || ''
	}
}

export default async function Page(){
	const links = await getLinks()
	const configs = await getConfigs()
	return (
		<>
			<HomePage link_records={links?.records} config_records={configs?.records}  />
		</>
	)
}
