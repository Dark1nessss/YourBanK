"use client"

import React from "react";

const FooterLanding = () => {
  return (
    <footer className="bg-muted py-4">
      <div className="footer-landing">
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </div>
    </footer>
  );
};

export default FooterLanding;
