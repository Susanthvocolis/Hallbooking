"use client";
import React from "react";

export default function InvitationPopup() {
  const handleAccept = () => {
    // API call logic goes here
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg flex flex-col items-center">
        <div className="bg-purple-100 rounded-full p-3 mb-4">
          <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c2.28 0 4-1.72 4-4s-1.72-4-4-4-4 1.72-4 4 1.72 4 4 4zm0 2a8.97 8.97 0 00-8 4.47V19h16v-1.53A8.97 8.97 0 0012 13z" />
          </svg>
        </div>
        <h2 className="font-bold text-xl mb-2 text-center" style={{color:"black"}}>You've Been Invited</h2>
        <p className="text-gray-500 text-center mb-4">
          You've been invited to join the team. Click the button below to accept your invitation and get started.
        </p>
        <div className="bg-gray-50 rounded-lg p-4 mb-5 w-full text-sm">
          <div className="flex justify-between mb-1" style={{color:"black"}}><span>Invited by</span><span className="font-medium">Sarah Johnson</span></div>
          <div className="flex justify-between mb-1" style={{color:"black"}}><span>Organization</span><span className="font-medium">Acme Corporation</span></div>
          <div className="flex justify-between" style={{color:"black"}}><span>Role</span><span className="font-medium">Team Member</span></div>
        </div>
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg w-full mb-2"
          onClick={handleAccept}
        >
          Accept Invitation
        </button>
        <span className="text-xs text-gray-400 mt-2 text-center w-full">
          By accepting, you agree to our Terms of Service and Privacy Policy
        </span>
      </div>
    </div>
  );
}
