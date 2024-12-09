"use client"

import React from "react";

const FooterLanding = () => {
  return (
    <footer className="bg-muted py-4">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </div>
    </footer>
  );
};

export default FooterLanding;
