'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {Fragment, useEffect, useState} from "react";
import { Button } from "@/components/ui/button";
import {CheckIcon, DotsHorizontalIcon, Link2Icon} from "@radix-ui/react-icons";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterShareButton,
  XIcon
} from "react-share";

import { motion } from "framer-motion"
import Image from "next/image";

type LinkRecord = {
  id: string,
  createdTime: string,
  fields: {
    title: string,
    url: string
  }
}

type ConfigRecord = {
  id: string,
  createdTime: string,
  fields: {
    title: string,
    value: string
  }
}

export default function HomePage(props: {link_records?: LinkRecord[], config_records?: ConfigRecord[]}) {
  const curHref =
    typeof window !== 'undefined' && window.location.href
      ? window.location.href
      : ''

  const [modal, setModal] = useState({
    open: false,
    link: {
      title: '',
      url: ''
    }
  })

  const [copiedLink, setCopiedLink] = useState(false)

  return (
    <main
      className={'py-8 px-4 min-h-screen ' +
        'bg-gradient-to-b from-stone-300 via-purple-100 to-stone-50' +
        'dark:bg-gradient-to-b dark:from-background dark:to-muted'}
    >

      <div className={'max-w-2xl mx-auto my-8 relative'}>
        <div className={'absolute md:left-full right-0 md:right-auto bottom-full'}>
          <Button
            variant={'secondary'}
            size={'icon'}
            className={'rounded-full'}
            onClick={() => setModal({
              open: true,
              link: {
                url: curHref,
                title: 'Vinh Web'
              }
            })}
          >
            <DotsHorizontalIcon/>
          </Button>
        </div>

        <Avatar className={'h-24 w-24 mx-auto'}>
          <AvatarImage
            src={props.config_records?.find((r: any) => r.fields.title === 'main_avatar')?.fields.value || "https://github.com/shadcn.png"}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <section className={'text-center mt-5'}>
          <h1 className={'text-xl font-semibold mb-1'}>
            {props.config_records?.find((r: any) => r.fields.title === 'main_title')?.fields.value  || 'Vinh Web'}
          </h1>
          <p className={''}>
            {props.config_records?.find((r: any) => r.fields.title === 'main_description')?.fields.value || 'Empty description'}
          </p>
        </section>

        <section className={'flex flex-col gap-4 mt-8 w-full mx-auto'}>
          {props.link_records?.map((link, index) => (
            <Fragment key={index}>
              <motion.div
                className={'group rounded-full overflow-hidden shadow-md hover:shadow-lg relative'}
                whileHover={{
                  scale: 1.015
                }}
                transition={{ease: 'easeInOut'}}
              >
                <a className={'py-5 px-12 text-center bg-white text-neutral-950 block dark:bg-cyan-950 dark:text-white'} href={link.fields.url} target={'_blank'}>
                  <span className="leading-snug">{link.fields.title}</span>
                </a>
                <div className={'flex lg:hidden group-hover:flex z-10 absolute right-0 top-0 h-full aspect-square items-center justify-center'}>
                  <Button
                    variant={'ghost'}
                    size={'icon'}
                    className={'rounded-full'}
                    onClick={() => setModal({
                      open: true,
                      link: link.fields
                    })}
                  >
                    <DotsHorizontalIcon/>
                  </Button>
                </div>
              </motion.div>
            </Fragment>
          ))}
        </section>
      </div>


      <Dialog
        open={modal.open}
        onOpenChange={(open: boolean) => setModal({...modal, open})}
      >
        <DialogContent
          className={'sm:max-w-sm md:max-w-lg rounded-t-2xl md:rounded-2xl top-full -translate-y-full sm:top-1/2 sm:-translate-y-1/2'}
        >
          <DialogHeader>
            <DialogTitle className={'text-center text-base'}>Chia sẻ Link</DialogTitle>
          </DialogHeader>
          <div className={'grid gap-4'}>
            {/*main link*/}
            {modal.link.url === curHref ? (
              <div className={'relative aspect-video w-full rounded-3xl overflow-hidden'}>
                <Image src={'/opengraph-image'} alt={'og-image'} fill={true} objectFit={'cover'} objectPosition={'center'} />
              </div>
            ) : (
              <motion.a
                href={modal.link.url}
                target={'_blank'}
                className={'flex flex-col gap-1 items-center py-6 px-5 w-full sm:max-w-80 mx-auto bg-stone-100 dark:bg-accent rounded-3xl'}
                whileHover={{
                  scale: 1.025
                }}
                transition={{
                  ease: 'easeOut'
                }}
              >
                <h3 className={'text xl font-bold leading-snug'}>{modal.link.title}</h3>
                <p className={'text-[13px] text-center whitespace-nowrap w-36 text-ellipsis overflow-hidden'}>{modal.link.url}</p>
              </motion.a>
            )}


            {/*socials share*/}
            <div className="flex items-start justify-center gap-4 my-4">
              <button
                className={'flex flex-col items-center text-center gap-2'}
                onClick={()=>{
                  navigator.clipboard.writeText(modal.link.url)
                  setCopiedLink(true)
                  setTimeout(() => setCopiedLink(false), 2000)
                }}
              >
                <div className={'bg-neutral-200 dark:bg-accent flex items-center justify-center w-12 h-12 rounded-full overflow-hidden mx-2'}>
                  {copiedLink ? (
                    <CheckIcon className={'w-5 h-5 text-green-700 dark:text-green-400'}/>
                    ) : (
                    <Link2Icon className={'w-5 h-5'}/>
                  )}
                </div>

                {copiedLink ? (
                  <p className="text-xs text-green-700 dark:text-green-400">Copied</p>
                ) : (
                  <p className="text-xs">Copy Link</p>
                )}
              </button>

              <TwitterShareButton
                url={modal.link.url}
                className={'flex flex-col items-center text-center gap-2'}
              >
                <div className={'flex items-center justify-center w-12 h-12 rounded-full overflow-hidden mx-2'}>
                  <XIcon className={'h-full w-full'}/>
                </div>
                <p className="text-xs">X</p>
              </TwitterShareButton>

              <FacebookShareButton
                url={modal.link.url}
                className={'flex flex-col items-center text-center gap-2'}
              >
                <div className={'flex items-center justify-center w-12 h-12 rounded-full overflow-hidden mx-2'}>
                  <FacebookIcon className={'h-full w-full'}/>
                </div>
                <p className="text-xs">Facebook</p>
              </FacebookShareButton>

              <LinkedinShareButton
                url={modal.link.url}
                className={'flex flex-col items-center text-center gap-2'}
              >
                <div className={'flex items-center justify-center w-12 h-12 rounded-full overflow-hidden mx-2'}>
                  <LinkedinIcon className={'h-full w-full'}/>
                </div>
                <p className="text-xs">Linkedin</p>
              </LinkedinShareButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>

    </main>
  );
}
