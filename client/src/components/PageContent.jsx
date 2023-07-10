function PageContent({ title, children }) {
  return (
    <div className="text-center font-bold text-[25px]">
      <h1 className="text-center font-light text-[20px]">
        {title}
      </h1>
      {children}  
    </div>
  );
}

export default PageContent;
