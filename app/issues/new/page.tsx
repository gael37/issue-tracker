import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";

const IssueForm = dynamic(
  () => import('@/app/issues/_components/IssueForm'),
  {
    ssr: false,
    loading: () => <IssueFormSkeleton />
  }
);

const NewIssuePage = () => {
  return (
    <section className='landing-section'>

      <div className='max-w-6xl pt-24 mx-auto pl-5 pr-5'>
        <IssueForm />
      </div>
    </section>



  )
}

export default NewIssuePage