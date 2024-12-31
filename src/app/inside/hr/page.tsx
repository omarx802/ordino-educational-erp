
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,

  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";

const teamMembers = [
  {
    avatar: "/avatars/user1.png",
    name: "John",
    surname: "Doe",
    email: "john.doe@example.com",
    role: "Software Engineer",
    memberSince: "2020-01-15",
  },
  {
    avatar: "/avatars/user2.png",
    name: "Jane",
    surname: "Doe",
    email: "jane.smith@example.com",
    role: "Product Manager",
    memberSince: "2019-03-22",
  },
  {
    avatar: "/avatars/user3.png",
    name: "Michael",
    surname: "Joe",
    email: "michael.johnson@example.com",
    role: "UX Designer",
    memberSince: "2021-06-10",
  },
  {
    avatar: "/avatars/user4.png",
    name: "Emily",
    surname: "Doe",
    email: "emily.davis@example.com",
    role: "QA Engineer",
    memberSince: "2018-11-05",
  },
];


export default function HR() {
  const today = new Date().toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/dashboard-light.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="block dark:hidden"
        />
        <Image
          src="/examples/dashboard-dark.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">HR Section</h2>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">
                Analytics
              </TabsTrigger>
              <TabsTrigger value="manage" disabled>
                Manage
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="flex flex-col w-full">
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>Team Members</CardTitle>
                    <CardDescription>
                      View all your team members.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="overflow-x-auto">
                    <Table>
                      <TableCaption>{`${today}`}</TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Avatar</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Member Since</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {teamMembers.map((member) => (
                          <TableRow key={member.email}>
                            <TableCell>
                                <Avatar>
                                  <AvatarImage src={member.avatar} />
                                  <AvatarFallback>{member.name[0]+member.surname[0]}</AvatarFallback>
                                </Avatar>
                            </TableCell>
                            <TableCell className="font-medium">{member.name}</TableCell>
                            <TableCell>{member.email}</TableCell>
                            <TableCell>{member.role}</TableCell>
                            <TableCell>{member.memberSince}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
