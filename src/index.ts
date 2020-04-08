import Apify from "apify";
import cheerio from "cheerio";

Apify.main(async () => {
  const requestQueue = await Apify.openRequestQueue();
  await requestQueue.addRequest({ url: "https://netflav.com/" });
  const pseudoUrls = [new Apify.PseudoUrl("https://netflav.com/[.*]")];
  const crawler = new Apify.CheerioCrawler({
    requestQueue,
    handlePageFunction: async ({ $, response, request, body }) => {
      const title = $("title");
      const src = $("video").attr("src");
      console.log(`Title of ${request.url}: ${title}`);
      console.log(`Video of ${request.url}: ${src}`);
      await Apify.utils.enqueueLinks({
        $: cheerio.load(body),
        selector: "a",
        pseudoUrls,
        baseUrl: "https://netflav.com",
        requestQueue,
      });
    },
    maxRequestsPerCrawl: 100,
    maxConcurrency: 10,
    proxyUrls: ["http://127.0.0.1:7890"],
  });

  await crawler.run();
});
