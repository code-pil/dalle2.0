import { useState, useEffect } from "react";

import { FormField, RenderCards, Head } from "../components";
import { json, useLoaderData, useRouteLoaderData } from "react-router-dom";

const Home = () => {
  const [allPost, setAllPost] = useState(null);

  const [searchText, setSearchText] = useState("");
  const token = useRouteLoaderData("root");
  const data = useLoaderData();

  useEffect(() => {
    setAllPost(data);
  }, [data]);

  const [searchedResult, setSearchedResult] = useState(null);
  const [searchTimeOut, setSearchTimeOut] = useState(null);

  const searchHandler = (e) => {
    clearTimeout(searchTimeOut);
    setSearchText(e.target.value);

    setSearchTimeOut(
      setTimeout(() => {
        const searchResult = allPost.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );

        setSearchedResult(searchResult);
      }, 500)
    );
  };

  return (
    <section className="max-w-7xl mx-auto">
      <Head
        title="The Community Showcase"
        subTitle="Browse through a collection of imaginative and visually stunning images generated by DALL-E AI"
      />

      {!token && (
        <Head subTitle="Signup to generate an imaginative image through DALL-E AI and share it with the community" />
      )}

      <div className="mt-8">
        <FormField
          labelName="Search Post"
          type="text"
          name="text"
          placeholder="Search posts"
          value={searchText}
          handleChange={searchHandler}
        />
      </div>

      <div className="mt-10">
        {searchText && (
          <h2 className="font-medium text-[#666e75] text-xl mb-3">
            Showing Resuls for{" "}
            <span className="text-[#222328]">{searchText}</span>:
          </h2>
        )}
        <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
          {searchText ? (
            <RenderCards
              data={searchedResult}
              title="No search results found"
            />
          ) : (
            <RenderCards data={allPost} title="No posts found" />
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;

export const loader = async () => {
  const response = await fetch(
    `https://dalle2-0-78b7.onrender.com/api/v1/posts`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw json({ message: "Could not fetch posts..." }, { status: 500 });
  }
  const data = await response.json();
  const res = data.data.reverse();
  return res;
};
