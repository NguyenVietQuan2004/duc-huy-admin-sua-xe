import BannerClient from "./banner-client";
const initialData = [
  "https://nhatphatauto.vn/wp-content/uploads/2024/06/NhatPhat-10year.jpg",
  "https://nhatphatauto.vn/wp-content/uploads/2024/06/NhatPhat-10year.jpg",
  "https://nhatphatauto.vn/wp-content/uploads/2024/06/NhatPhat-10year.jpg",
];
function Banner() {
  return (
    <div>
      <BannerClient initialData={initialData} />{" "}
    </div>
  );
}

export default Banner;
