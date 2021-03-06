import { Loan } from '../globals.d';
import { NativeImage } from './native-image-utils';
// Takes an object and returns a Loan (V1 api)
// export function mapToLoan(item: any): Loan {
//   return {
//     id: item.id,
//     name: item.name,
//     status: item.status,
//     fundedAmount: item.funded_amount,
//     basketAmount: item.basket_amount,
//     sector: item.sector,
//     // image: {
//     //   id: item.image.id,
//     //   templateId: item.image.template_id,
//     //   src: getImageSrc(item.image.id)
//     // },
//     imageId: item.image.id,
//     image: new NativeImage(getImageSrc(item.image.id)),
//     use: item.use,
//     activity: item.activity,
//     loanAmount: item.loan_amount,
//     location: {
//       country: item.location.country,
//       countryCode: item.location.country_code,
//       town: item.location.town
//     }
//   };
// }

// For use with V2
export function mapToLoan(item: any): Loan {
  let output = {
    id: item.properties.id,
    name: item.properties.name,
    status: item.properties.status,
    fundedAmount: item.properties.fundedAmount,
    basketAmount: item.properties.basketAmount,
    sector: item.properties.sector,
    imageId: item.entities[0].properties.id, // TODO sketchy
    image: new NativeImage(getImageSrc(item.entities[0].properties.id)),
    use: item.properties.use,
    activity: item.properties.activity,
    loanAmount: item.properties.loanAmount,
    location: {
      country: item.properties.location.country.name,
      countryCode: item.properties.location.country.geocode.countryId,
      town: item.properties.location.country.geocode.city,
      state: item.properties.location.country.geocode.state,
      lat: item.properties.location.country.geocode.latitude,
      long: item.properties.location.country.geocode.longitude,
    },
    borrowerCount: item.properties.borrowerCount,
    purpose: item.properties.purpose,
    businessDescription: item.properties.businessDescription,
    businessName: item.properties.businessName,
    socialLinksWebsite: item.properties.socialLinks.website_url,
    socialLinksFacebook: item.properties.socialLinks.facebook_url,
    socialLinksTwitter: item.properties.socialLinks.twitter_url,
    lenderRepaymentTerm: item.properties.lenderRepaymentTerm,
  };
  return output;
}

export function getImageSrc(imageId: number, size: number = 128) : string {
  // return 'http://www.kiva.org/img/128/' + imageId + '.jpg';
  return `http://www-dev-kiva-org.global.ssl.fastly.net/img/${size}/${imageId}.jpg`;
}

export function calcFundingProgress(goal: number | string,
  funded: number | string) : number {
  return Math.round((Number(funded) / Number(goal)) * 100);
}
