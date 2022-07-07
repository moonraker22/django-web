import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ALL_CATEGORIES } from "../lib/ApolloQueries";
import newApolloClient from "../lib/MyApolloClient";
import { store } from "../context/store";

import { getJwtToken, preFetch } from "../lib/auth";

// export async function getStaticProps(context) {
//   const [categories, setCategories] = React.useState([]);
//   let categoriesList = [];
//   const client = newApolloClient();
//   preFetch(client);
//   const { res, err } = client
//     .query({
//       query: ALL_CATEGORIES,
//       credentials: "include",
//       context: {
//         headers: {
//           Authorization: `JWT ${getJwtToken()}`,
//         },
//       },
//     })
//     .then((res) => {
//       //   console.log(res);
//       res.data.categoryList.forEach((category) => {
//         categoriesList.push(category.name);
//         setCategories((state) => [...state, category.name]);
//       });
//       //   console.log(categories);
//       return res;
//     })
//     .catch((err) => {
//       console.log(err.message);
//       return err;
//     });

//   return {
//     props: {
//       categories: categories,
//       categoriesList: categoriesList,
//     }, // will be passed to the page component as props
//   };
// }

export default function CategoryDrop() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [categories, setCategories] = React.useState([]);

  let categoriesList = [];

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const client = newApolloClient();

  if (typeof window !== "undefined") {
    React.useEffect(() => {
      preFetch(client);
      const { res, err } = client
        .query({
          query: ALL_CATEGORIES,
          credentials: "include",
          context: {
            headers: {
              Authorization: `JWT ${getJwtToken()}`,
            },
          },
        })
        .then((res) => {
          //   console.log(res);
          res.data.categoryList.forEach((category) => {
            categoriesList.push(category.name);
            setCategories((state) => [...state, category.name]);
          });
          //   console.log(categories);
          return res;
        })
        .catch((err) => {
          console.log(err.message);
          return err;
        });
    }, []);
  }
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Categories
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {categories.map((category) => (
          <MenuItem key={category} onClick={handleClose}>
            {category}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
