import faker from "faker";
// utils
import { mockImgCover } from "../utils/mockImages";
// @types
import { Profile } from "../@types/user";

const createId = (index: string | number) =>
  `fc68bad5-d430-4033-b8f8-4bc069dc0ba0-${index}`;

export const fetchProfile = (): Profile => ({
  id: createId(1),
  cover: mockImgCover(1),
  position: "UI Designer",
  follower: faker.datatype.number(),
  following: faker.datatype.number(),
  quote:
    "Tart I love sugar plum I love oat cake. Sweet roll caramels I love jujubes. Topping cake wafer..",
  country: faker.address.country(),
  email: faker.internet.email(),
  company: faker.company.companyName(),
  school: faker.company.companyName(),
  facebookLink: `https://www.facebook.com/caitlyn.kerluke`,
  instagramLink: `https://www.instagram.com/caitlyn.kerluke`,
  linkedinLink: `https://www.linkedin.com/in/caitlyn.kerluke`,
  twitterLink: `https://www.twitter.com/caitlyn.kerluke`,
});
