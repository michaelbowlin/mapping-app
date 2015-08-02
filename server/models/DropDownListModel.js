var mongoose = require('mongoose');

var ddlSchema = mongoose.Schema({
  title: {type: String},
  list: [String]
});

var DropDownList = mongoose.model('DropDownList', ddlSchema);

function createDropDownLists() {
  DropDownList.find({}).exec(function(err, collection) {
    if (collection.length === 0) {
      DropDownList.create({
        title: "State",
        list: ['Alabama, AL', 'Alaska, AK', 'Arizona, AZ', 'Arkansas, AR', 'California, CA',
          'Colorado, CO', 'Connecticut, CT', 'Deleware, DE', 'Florida, FL', 'Georgia, GA',
          'Hawaii, HI', 'Idaho, ID', 'Illinois, IL', 'Indiana, IN', 'Iowa, IA', 'Kansas, KS',
          'Kentucky, KY', 'Louisiana, LA', 'Maine, ME', 'Maryland, MD', 'Massachusetts, MA',
          'Michigan, MI', 'Minnesota, MN', 'Mississippi, MS', 'Missouri, MO', 'Montana, MT',
          'Nebraska, NE', 'Nevada, NV', 'New Hampshire, NH', 'New Jersey, NJ', 'New Mexico, NM',
          'New York, NY', 'North Carolina, NC', 'North Dakota, ND', 'Ohio, OH', 'Oklahoma, OK',
          'Oregon, OR', 'Pennsylvania, PA', 'Rhode Island, RI', 'South Carolina, SC',
          'South Dakota, SD', 'Tennessee, TN', 'Texas, TX', 'Utah, UT', 'Vermont, VT',
          'Virginia, VA', 'Washington, WA', 'West Virginia, WV', 'Wisconsin, WI',
          'Wyoming, WY']
      });

      DropDownList.create({
        title: "Product Type",
        list: ['Appraisal', 'Highest and Best Analysis',
          'Consultation', 'Market Analysis', 'Market Rent Analysis', 'Other']
      });

      DropDownList.create({
        title: "Property Type: Categories",
        list: ['Land', 'Industrial', 'Office', 'Retail', 'Multi-Family', 'Hotel', 'Special Purpose']
      });

      DropDownList.create({
        title: "Property Type: Land",
        list: ['Residential Development', 'Commercial', 'Agricultural']
      });

      DropDownList.create({
        title: "Property Type: Industrial",
        list: ['Office Warehouse', 'Showroom Warehouse', 'Flex', 'Manufacturing',
         'Refrigerated/Cold Storage']
      });

      DropDownList.create({
        title: "Property Type: Office",
        list: ['CBD', 'Suburban', 'Medical', 'R&D']
      });

      DropDownList.create({
        title: "Property Type: Retail",
        list: ['Shopping Center – Power Center, Community Center',
          'Shopping Center – Neighborhood Center, Convenience Center',
          'Freestanding Building', 'Restaurant', 'Regional Mall/Lifestyle Center',
          'Convenience Store']
      });

      DropDownList.create({
        title: "Property Type: Multi-Family",
        list: ['Garden-style', 'Tower', 'Income-restricted', 'Student Housing', 
        'Senior/Assisted Living', 'Mobile Home/RV Community']
      });

      DropDownList.create({
        title: "Property Type: Hotel",
        list: ['Limited-Service', 'Full-Service', 'Extended-Stay', 'Hotel/Casino']
      });

      DropDownList.create({
        title: "Property Type: Special Purpose",
        list: ['Winery/Vineyard', 'Water Treatment Facility', 'Water Retention Facility',
          'Veterinarian/Kennel', 'Utility Sub-Station', 'Truck Terminal',
          'Truck Stop', 'Theater/Concert Hall', 'Swimming Pool', 'Sorority / Fraternity House',
          'Skilled Nursing/Rehabilitation Facility', 'Skating Rink', 'Shipyard',
          'Self-Storage', 'Schools', 'Religious Facility', 'Recycling Center',
          'Radio/TV Transmission Facilities', 'Race Track', 'Public Library', 'Railroad Yard',
          'Post Office', 'Police / Fire Station', 'Parking Lot', 'Parking Garage',
          'Data Center/Telecom Hotel', 'Movie/Radio/TV Studio', 'Movie Theatre',
          'Hospital', 'Marina', 'Lumberyard', 'Lodge/Meeting Hall', 'Landfill',
          'Horse Stables', 'Health Club', 'Golf Course/Driving Range',
          'Garden Center', 'Funeral Home', 'Food Processing', 'Fast Food',
          'Drug Store', 'Drive-in Movie', 'Dormitory', 'Day Care Center',
          'Correctional Facility', 'Contractor Storage Yard', 'Convenience Store',
          'Chemical/Oil Refinery', 'Cemetery/Mausoleum', 'Cement/Gravel Plant',
          'Car Wash', 'Bowling Alley', 'Baseball Field', 'Bar', 'Bank',
          'Auto Salvage Facility', 'Auto Repair', 'Auto Dealership',
          'Amusement Park', 'Airport', 'Airplane Hangar', 'Mixed Uses']
      });

      DropDownList.create({
        title: "Improvement Size",
        list: ['Less Than 25,000 SF', '25,000 SF to100,000 SF',
          '100,000 SF to 250,000 SF', '250,000 SF to 500,000 SF',
          '500, 000 SF or More']
      });

      DropDownList.create({
        title: "Improvement Size: Multi-Family",
        list: ['Less Than 50 Units', '51 - 100 Units', '101-200 Units',
          '200 or More Unit']
      });

      DropDownList.create({
        title: "Land Size",
        list: ['Less Than 2 Acres', '2-10 Acres', '10-50 Acres', '50 Acres or more']
      });

      DropDownList.create({
        title: "Relevant Condition",
        list: [
          'Environmental Issue', 'High Vacancy', 'Grocery-Anchored',
          'Intended Use in Litigation', 'Conservation Easement', 'Easement-Impacted',
          'Historic Property', 'Single-Tenant Net Lease', 'Owner-occupant',
          'Advanced Market Analysis/Conclusions', 'Retrospective Opinion of Value',
          'Highest and Best Use Concerns', 'Construction Defect',
          'Flood-Plain Encumberance', 'Independent Hotel', 'Eminent Domain',
          'Proposed Construction', 'Vacant', 'Corridor Valuation',
          'Trophy-Level Asset']
      });
    }
  });
}

exports.createDropDownLists = createDropDownLists;