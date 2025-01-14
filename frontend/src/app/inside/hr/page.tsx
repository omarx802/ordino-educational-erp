"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { fetchUserTeam, fetchTeamUsers } from "@/src/lib/api";
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

export default function HR() {
  const today = new Date().toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  interface User {
    id: number;
    avatar?: string;
    surname: string;
    name: string;
    role: string;
    registered_in: string;
    email: string;
  }

  interface TeamMembersResponse {
    members: User[] | null;
  }

  const [teamMembers, setTeamMembers] = useState<TeamMembersResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token") || "";

    const getTeamData = async () => {
      try {
        
        const teamData = await fetchUserTeam(token);
        const teamId = teamData.id;

        const teamMembersData = await fetchTeamUsers(teamId, token);
        setTeamMembers(teamMembersData);
      } catch {
        setError("Failed to load team data.");
      } finally {
        setLoading(false);
      }
    };

    getTeamData();
  }, []);

  // Render loading or error message
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Ensure teamMembers is not null before rendering
  if (!teamMembers || !teamMembers.members) {
    return <p>No team members available.</p>;
  }

  return (
      <div className="hidden flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">HR Section</h2>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="manage" disabled>
                Manage
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="flex flex-col w-full">
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>Team Members</CardTitle>
                    <CardDescription>View all your team members.</CardDescription>
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
                        {teamMembers.members.map((member: User) => (
                          <TableRow key={member.email}>
                            <TableCell>
                              <Avatar>
                                <AvatarImage src={member?.avatar} />
                                <AvatarFallback>
                                  {member.name[0] + member.surname[0]}
                                </AvatarFallback>
                              </Avatar>
                            </TableCell>
                            <TableCell className="font-medium">{member.name} {member.surname}</TableCell>
                            <TableCell>{member.email}</TableCell>
                            <TableCell>{member.role}</TableCell>
                            <TableCell>{member.registered_in}</TableCell>
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
  );
}
