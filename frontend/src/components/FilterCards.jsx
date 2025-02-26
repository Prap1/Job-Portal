import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

const FilterData = [
  {
    filterType: "Location",
    values: ["Delhi Ncr", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    values: ["frontend developer", "Full stack developer", "Data Science", "Backend Developer",],
  },
  {
    filterType: "Salary",
    values: ["0-5 LPA", "5-10 LPA", "10-15 LPA", "15-20 LPA"],
  },
];

const FilterCards = () => {
  return (
    <div className=" w-full bg-white p-3 rounded-md">
      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr className="mt-3" />
      {FilterData.map((data, index) => (
        <div key={index}>
          <h2 className="font-bold text-lg">{data.filterType}</h2>
          <RadioGroup>
            {data.values.map((item, idx) => (
              <div className="flex items-center space-x-2 my-2" key={idx}>
                <RadioGroupItem value={item} />
                <Label>{item}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};

export default FilterCards;
