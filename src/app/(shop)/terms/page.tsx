

export default function TermsAndConditions() {
  return (
    <div className="flex items-center justify-center h-full mt-10 mb-6 mx-auto p-2 container">
      <p>
        <span> &copy;{new Date().getFullYear()} </span>
        This website is an academic demonstration project developed for educational and portfolio purposes. It does not represent a real online store and has no commercial intent. Any simulated transactions, payments, or personal data entered in this application are fictional and are neither stored, processed, nor used for actual purposes.
        The content, design, and source code of this project are the property of developer Alexis Galarza and are available in this repository. Any questions, comments, or recommendations are welcome. Contact me.
        This project is created solely to demonstrate technical skills in Next.js and the tools related to the Framework.
      </p>
    </div>
  )
}