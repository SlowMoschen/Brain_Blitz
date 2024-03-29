interface ArticleProps {
  containerClass?: string;
  title?: {
    content: string;
    textColor?:
      | "text-text-primary"
      | "text-text-secondary"
      | "text-primary"
      | "animated-bg";
    border_b: boolean;
  };
  para1: string;
  para2?: string;
  para3?: string;
  textColor?: "text-text-primary" | "text-text-secondary";
}

function Article({
    containerClass = "",
  title,
  para1,
  para2,
  para3,
  textColor = "text-text-primary",
}: ArticleProps) {
  return (
    <article className={`flex flex-col items-center justify-center w-full h-full p-4 max-w-5xl ${containerClass}`}>
      <h1
        className={`text-4xl font-bold text-center my-3 ${title?.textColor} ${
          title?.border_b ? "border-b-8 border-accent-light" : ""
        }`}
      >
        {title?.content}
      </h1>
      <p className={`text-lg my-2 ${textColor}`}>{para1}</p>
      {para2 && <p className={`text-lg my-2 ${textColor}`}>{para2}</p>}
      {para3 && <p className={`text-lg my-2 ${textColor}`}>{para3}</p>}
    </article>
  );
}

export default Article;
