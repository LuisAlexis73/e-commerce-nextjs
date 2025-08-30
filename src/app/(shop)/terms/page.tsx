

export default function TermsAndConditions() {
  return (
    <div className="flex flex-col h-full mt-10 mb-6 mx-auto space-y-2 container text-pretty">
      <p>
        <span> &copy;{new Date().getFullYear()} </span>
        This website is an academic demonstration project developed for educational and portfolio purposes. It does not represent a real online store and has no commercial intent. Any simulated transactions, payments, or personal data entered in this application are fictional and are neither stored, processed, nor used for actual purposes.
        The content, design, and source code of this project are the property of developer Alexis Galarza and are available in  <a href="https://github.com/LuisAlexis73/e-commerce-nextjs" className="text-blue-500 underline hover:text-blue-600">this repository.</a> Any questions, comments, or recommendations are welcome. Contact me.
        This project is created solely to demonstrate technical skills in Next.js and the tools related to the Framework.
      </p>

      <p>
        This website is an academic demonstration project developed for educational and portfolio purposes. It does not represent a real online store and has no commercial intent. Any simulated transactions, payments, or personal data entered in this application are fictional and are neither stored, processed, nor used for actual purposes.
        The content, design, and source code of this project are available in  <a href="https://github.com/LuisAlexis73/e-commerce-nextjs" className="text-blue-500 underline hover:text-blue-600">this repository</a> and are protected under MIT license. Reproduction, distribution, or commercial use of this material without prior written permission is strictly prohibited.
      </p>

      <p>
        1. Acceptance of Terms
        By accessing or using this website, you acknowledge that you have read, understood, and agreed to these Terms and Conditions in their entirety. This site is a <em>non-commercial academic demonstration project</em>, and therefore does not create legal obligations or process real transactions.
      </p>

      <p>
        2. Purpose of the Site
        This application is designed exclusively to showcase technical proficiency in Next.js development. <em>It is not a functional online store</em>, and as such:
        - All displayed products are fictional.
        - Simulated payments are not processed or stored.
        - Any user-provided data (e.g., emails, addresses) is temporary and not retained.
      </p>

      <p>
        3. Permitted Use
        Access and navigation are authorized solely for educational or technical evaluation purposes. <em>Strictly prohibited</em>:
        - Using the site for commercial, illegal, or fraudulent activities.
        - Attempting to extract, modify, or interfere with the source code without authorization.
        - Generating automated traffic or conducting penetration tests without consent.
      </p>

      <p>
        4. Intellectual Property
        All visual elements, text, logos, and code are available in <a href="https://github.com/LuisAlexis73/e-commerce-nextjs" className="text-blue-500 underline hover:text-blue-600">this repository.</a> External resources (e.g., product images) are sourced from royalty-free platforms (e.g., Unsplash, Placehold.it) and are used for illustrative purposes only.
      </p>

      <p>
        5. Disclaimer
        As this is a demonstration project:
        - <em>No warranties</em> are provided regarding availability, accuracy, or security of the site.
        - <em>No liability</em> is assumed for errors in fictional data, service interruptions, or misuse by users.
        - Third-party links (e.g., test APIs) are for reference only and do not constitute endorsement.
      </p>

      <p>
        6. Changes to Terms
        We reserve the right to modify these terms at any time. Changes will take effect immediately upon publication on this page. Users are encouraged to review this section periodically.
      </p>

      <p>
        7. Contact
        For inquiries regarding these terms, contact the developer at: <br />
        Email: <a href="mailto:luisalexisgalarza73@gmail.com" className="text-blue-500 underline hover:text-blue-600">Alexis Galraza</a> <br />
        Portfolio: <a href="https://alexis-galarza-porfolio.vercel.app/" className="text-blue-500 underline hover:text-blue-600">alexis-porfolio</a>
      </p>

      <em>Note: This document is part of a technical exercise. It does not constitute a legally binding agreement for a real commercial application.</em>
    </div>
  )
}