"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  UserRoundPen,
} from "lucide-react"

import { NavMain } from "@/components/user/dashboard-layout/nav-main"
import { NavUser } from "@/components/user/dashboard-layout/nav-user"
import { TeamSwitcher } from "@/components/user/dashboard-layout/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useUser } from "@/context/UserContext"

// This is sample data.
const data = {
  teams: [
    {
      name: "Finups BD",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "My Application",
      url: "#",
      icon: SquareTerminal,
      isActive: false,
      items: [
        {
          title: "Loan Application",
          url: "/user/loan-application",
        },
        {
          title: "Application Staus",
          url: "/user/my-application/application-status",
        },
        {
          title: "Cards",
          url: "#",
        },
        {
          title: "Bima/Insurance",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "/user/setting",
      icon: Settings2,
      items: [
        {
          title: "Change Password",
          url: "#",
        },
        {
          title: "Update Email",
          url: "#",
        },
        {
          title: "Update Mobile Number",
          url: "#",
        },
      ],
    },

  ],
  projects: [
    {
      name: "Profile",
      url: "#",
      icon: Frame,
    },
    {
      name: "Saved Products",
      url: "#",
      icon: PieChart,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser()


  return (
    <div className="z-50 ">
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <TeamSwitcher teams={data.teams} />
        </SidebarHeader>
        <SidebarContent>
          {/* <NavProfile projects={data.projects} /> */}
          <NavMain items={data.navMain} />
          {/* <NavProjects projects={data.projects} /> */}
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </div>
  )
}
