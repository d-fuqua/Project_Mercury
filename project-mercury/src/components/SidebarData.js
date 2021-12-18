import React from 'react'
import { AiOutlineHome, AiOutlineMail, AiOutlineBarChart } from 'react-icons/ai'
import { BiCoinStack } from 'react-icons/bi'
import { RiFoldersLine } from 'react-icons/ri'

export const SidebarData = [
    {
        title: "Home",
        icon: <AiOutlineHome />,
        link: "/"
    },
    {
        title: "Mailbox",
        icon: <AiOutlineMail />,
        link: "/mailbox"
    },
    {
        title: "Budget",
        icon: <BiCoinStack />,
        link: "/budget"
    },
    {
        title: "Portfolio",
        icon: <RiFoldersLine />,
        link: "/portfolio"
    },
    {
        title: "Transactions",
        icon: <AiOutlineBarChart />,
        link: "/transactions"
    }
]
