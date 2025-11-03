import { reports } from "../utils/data";
import { FeatureCard } from "../components";

const Reports = () => {
  return (
    <section className="flex justify-center pt-36 pb-10">
      {/* Main container */}
      <section id="hero" className="w-full app__container px-5  lg:px-[48px]">
        {/* Title */}
        <div className="font-bold text-[20px] mb-10">Reports</div>

        {/* Feature items container */}
        <div className="w-full grid grid-[repeat(auto-fit,minmax(280px,1fr))] gap-8">
          {reports?.map((insight) => {
            const { content, date, id, imgUrl, link, title } = insight;
            return (
              <FeatureCard
                content={content}
                key={id}
                date={date}
                imgUrl={imgUrl}
                link={link}
                title={title}
              />
            );
          })}
        </div>
      </section>
    </section>
  );
};

export default Reports;
