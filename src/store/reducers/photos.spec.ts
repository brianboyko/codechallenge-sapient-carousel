import { photos, photoCache, IPhotosState, loading } from "./photos";
import { loadPhotos, setLoading } from "../actions/photos";

describe("./src/reducers/carousel.ts", () => {
  describe("photos", () => {
    it("simply stores the photos", () => {
      const foo = { query: "foo", totalHits: 3, hits: [], total: 3 };
      const bar = { query: "bar", totalHits: 5, hits: [], total: 5 };
      let testState: IPhotosState = {
        query: "",
        totalHits: 0,
        hits: [],
        total: 0
      };
      testState = photos(testState, loadPhotos(foo));
      expect(testState).toEqual(foo);
      testState = photos(testState, loadPhotos(bar));
      expect(testState).toEqual(bar);
    });
  });
  describe("photoCache", () => {
    it("stores the photos", () => {
      const foo = { query: "foo", totalHits: 3, hits: [], total: 3 };
      const bar = { query: "bar", totalHits: 5, hits: [], total: 5 };
      let testState: { [key: string]: IPhotosState } = {};
      testState = photoCache(testState, loadPhotos(foo));
      testState = photoCache(testState, loadPhotos(bar));
      expect(testState).toEqual({
        foo,
        bar
      });
    });
  });
  describe("loading", () => {
    it("tells us if we are waiting to load images", () => {
      const testStateFalse: boolean = false;
      const testStateTrue: boolean = true;
      expect(loading()).toBe(false);
      expect(loading(testStateFalse, setLoading(true))).toBe(true);
      expect(loading(testStateTrue, setLoading(false))).toBe(false);
      expect(loading(testStateTrue, loadPhotos({}))).toBe(false);
    });
  });
});
