# TikTok

An app built using React Native to show videos fetched from an online service.

The user can bookmark some of the vides, but it will get cleared on closing the app. To implement this only Redux is used, but we can use an API later to store favourites on a database (or use Async Storage to store data on the device).

---

Recycler List View is used for listing the videos (instead of Flat List or Scroll View) because of the following reasons:

- Recycler List View vs Scroll View

  Scroll View loads all the data in memory. Whereas, RLV only loads data currently in the viewport. This solves memory problems when rendering large lists.

- Recycler List View vs Flat List

  Flat List is the same as Recycler List View when it comes to loading only the data currently in the viewport. But the Flat List regularly destroys and creates new Views which decreases the performance. RLV solves this problem by "recycling" the views and increases the performance.
