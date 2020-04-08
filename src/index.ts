import Apify from "apify";
import dl from './dl';
Apify.main(async () => {
  const requestQueue = await Apify.openRequestQueue();
  await requestQueue.addRequest({ url: "https://netflav.com/uncensored" });
  const pseudoUrls = [new Apify.PseudoUrl("https://netflav.com/video[.*]")];
  const crawler = new Apify.CheerioCrawler({
    requestQueue,
    handlePageFunction: async ({ $, response, request, body }) => {
      const container = $("#__NEXT_DATA__").html();
      console.log('container: ',JSON.parse(container).props.initialState.uncensored);
      dl()
      // if (!container) {
      //   console.log('container: ', container);
      //   const src = $("video").attr("src");
      //   return console.log('no ==> ', src);
      // }

      // await Apify.utils.enqueueLinks({
      //   $: cheerio.load(container),
      //   selector: "a",
      //   pseudoUrls,
      //   baseUrl: "https://netflav.com",
      //   requestQueue,
      // });
    },
    maxRequestsPerCrawl: 100,
    maxConcurrency: 10,
    proxyUrls: ["http://127.0.0.1:1080"],
  });

  await crawler.run();
});
