import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import Card from "./Card";
import AprumAPI from "../apis/AprumAPI";
import Spinner from "./common/Spinner";

const Snippets = () => {
  const [loading, setLoading] = useState(true);
  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    AprumAPI.get("/snippets").then((res) => {
      setLoading(false);
      setSnippets(res.data.data);
    });
  }, []);

  if (loading)
    return (
      <div className="mt-20">
        <Spinner className="text-secondary" />
      </div>
    );
  return (
    <>
      <Helmet>
        <title>Latest Snippets | Aprum</title>
      </Helmet>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {snippets.map((snippet, index) => (
          <Card
            key={index}
            title={snippet.title}
            slug={snippet.slug}
            description={snippet.description}
            version={snippet.version}
            user={snippet.user}
            published={snippet.created_at}
          />
        ))}
      </div>
    </>
  );
};
export default Snippets;
