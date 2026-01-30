export default function MLRecruitment() {
  const formUrl =
    "https://docs.google.com/forms/d/e/1FAIpQLSfaoWzpib48lmQgIpaGq7NWhFJ6VO9_ocrY-HE9IlkmvO2yMg/viewform";
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-sky-800">
        ML Team Recruitment
      </h1>
      <p className="text-gray-700 mb-4">
        Join our Machine Learning team and work on cutting-edge AI projects!
      </p>
      <div className="w-full max-w-4xl mx-auto mt-8">
        <div className="mb-4 text-center">
          <a
            href={formUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-800 hover:text-sky-600 underline"
          >
            Click here if the form doesn't load below
          </a>
        </div>
        <iframe
          src={formUrl}
          width="100%"
          height="1200"
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
          className="rounded-lg shadow-lg border-2 border-gray-200"
        >
          Loading...
        </iframe>
      </div>
    </div>
  );
}
