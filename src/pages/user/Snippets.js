import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Card from "../../components/Card";
import AprumAPI from "../../apis/AprumAPI";
import Spinner from "../../components/common/Spinner";
import { Helmet } from "react-helmet";

const Snippets = () => {
  const user = useSelector((state) => state.auth.currentUser);
  const [loading, setLoading] = useState(true);
  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    AprumAPI.get("/user/snippets").then((res) => {
      setLoading(false);
      setSnippets(res.data.snippets);
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
        <title>My Snippets | Aprum</title>
      </Helmet>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {snippets.map((snippet) => (
          <Card
            title={snippet.title}
            description={snippet.description}
            version={snippet.version}
            user={user}
            published={snippet.created_at}
          />
        ))}
      </div>
    </>
  );
};
export default Snippets;
