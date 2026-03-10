import React from "react";

import Container from "@/components/shared/Container";
import UserSettingsForm from "./_components/UserSettingsForm";

export const metadata = {
  title: "Account Settings | Seoul Mirage",
  description: "Manage your security and profile settings.",
};

export default function UserSettingsPage() {
    return (
      <Container>
            
    
      <div className="mb-10">
        <h1 className="text-2xl font-black text-gray-800 tracking-tight uppercase">
          Account Settings
        </h1>
        <div className="h-1 w-12 bg-[#CCAF91] mt-2"></div>
      </div>

      <UserSettingsForm />

      </Container>
  );
}