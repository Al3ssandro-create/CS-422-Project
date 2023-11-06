import { InputAdornment} from "@mui/material";
import Input from "@mui/material/Input";
import PersonIcon from "@mui/icons-material/Person";


const SearchBar = ({
  searchString,
  setSearchString,
}: {
  searchString: string;
  setSearchString: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div>
      <Input
        onChange={(e) => {
          setSearchString(e.target.value);
        }}
        placeholder="Search Users"
        type="text"
        defaultValue={searchString}
        value={searchString}
        fullWidth
        startAdornment={
          <InputAdornment position="start">
            <PersonIcon />
          </InputAdornment>
        }
        sx={{
          '& .MuiInput-underline:before': { borderBottomColor: 'orange' },
          '& .MuiInput-underline:after': { borderBottomColor: 'orange' },
        }}
      />
    </div>
  );
};

export default SearchBar;
