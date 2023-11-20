import { Input } from "@nextui-org/react";
import {
  PersonIcon,
} from "@primer/octicons-react";


const SearchBar = ({
  searchString,
  setSearchString,
}: {
  searchString: string;
  setSearchString: (value: string) => void;
}) => {
  return (
      <Input
          type="text"
          fullWidth
          radius="full"
          placeholder="Your friends"
          startContent={<PersonIcon size={24}/>}
          value={searchString}
          onChange={(e) => {
            setSearchString(e.target.value.trimStart());
          }}
        />
  );
};

export default SearchBar;
