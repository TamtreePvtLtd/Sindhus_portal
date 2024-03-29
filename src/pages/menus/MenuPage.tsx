import Box from "@mui/material/Box";
import { useEffect, useRef, useState } from "react";
import { ICategory, ICategoryWithProducts } from "../../interface/types";
import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import Menus from "./Menus";
import { useGetAllDiningOutProducts } from "../../customRQHooks/Hooks";
import theme from "../../theme/theme";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import html2pdf from "html2pdf.js";
import { getAllDiningOutProducts } from "../../services/api";

import ReactDOM from "react-dom";
import MenuCardPdf from "./MenuCardPdf";

function MenuPage() {
  const categoryWithProducts = useGetAllDiningOutProducts();

  const [selectedMenuId, setSelectedMenuId] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );
const [pdfData, setPdfData] = useState<{
  selectedMenuId: string;
  selectedCategory: ICategoryWithProducts | null;
} | null>(null);

 
  useEffect(() => {
    if (selectedMenuId) {
      const selectedCategory = categoryWithProducts.data?.find(
        (category) => category.menuDatas._id === selectedMenuId
      );
      setSelectedCategory(selectedCategory || null);
      setPdfData({
        selectedMenuId,
        selectedCategory: selectedCategory || null,
      });
    }
  }, [selectedMenuId, categoryWithProducts.data]);

  
const generatePDF = () => {
  console.log("pdfData", pdfData);
  if (!pdfData) {
    console.error("No data available to generate PDF");
    return;
  }

  try {
    // Create a container element to hold the PDF content
    const container = document.createElement("div");

    // Render the pdfData content inside the container
    ReactDOM.render(<MenuCardPdf pdfData={pdfData} />, container);

    // Append the container to the document body
    document.body.appendChild(container);

    console.log("Container:", container);

    // Generate PDF from the container using html2pdf
    html2pdf().from(container).save();

    console.log("PDF generation initiated");

    // Cleanup: remove the container from the DOM after generating the PDF
    document.body.removeChild(container);
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};





// Add event listener to the print button

// const printButton = document.getElementById("printButton");

// if (printButton) {
//   printButton.addEventListener("click", generatePDF);
// } else {
//   console.error("Print button not found in the DOM");
// }

// useEffect(() => {
//   const printButton = document.getElementById("printButton");
//   if (printButton) {
//     printButton.addEventListener("click", generatePDF);
//   } else {
//     console.error("Print button not found in the DOM");
//   }

//   return () => {
//     // Cleanup: remove event listener when component unmounts
//     if (printButton) {
//       printButton.removeEventListener("click", generatePDF);
//     }
//   };
// }, []);

  // useEffect(() => {
  //   generatePDF();
  // }, []);

  const onSubMenuClick = (subMenuId: string) => {
    setSelectedMenuId(subMenuId);
    setSelectedCategory(null);
  };

  // const generatePDF = async () => {
  //   console.log("generatePDF function called");

  //   try {
  //     const content = await getAllDiningOutProducts();
  //     console.log("Content:", content);

  //     if (content && content.length > 0) {
  //       let htmlContent = "";

  //       // Generate HTML content with product data
  //       content.forEach((item) => {
  //         htmlContent += `<h3>${item.menuDatas.title}</h3>`;
  //         if (item.menuDatas.products && item.menuDatas.products.length > 0) {
  //           item.menuDatas.products.forEach((product) => {
  //             const productName = product.title ;
  //             // htmlContent += `<p>${productName}</p>`;
  //             if (product.dailyMenuSizeWithPrice && product.dailyMenuSizeWithPrice.length > 0) {

  //               product.dailyMenuSizeWithPrice.forEach((dailyMenu) => {

  //                 const dailyMenuTitle = dailyMenu.size;
  //                 const dailyMenuPrice = dailyMenu.price;

  //                 htmlContent += `<p>${productName}</p> <p>${dailyMenuTitle}: $${dailyMenuPrice}</p>`;
  //               });
  //             } else {
  //               htmlContent += "<p>No dailyMenuSizeWithPrice available</p>";
  //             }

  //           });
  //         } else {
  //           htmlContent += "<p>No products available</p>";
  //         }
  //       });

  //       console.log("HTML Content:", htmlContent);

  //       if (htmlContent) {
  //         const opt = {
  //           margin: 1,
  //           filename: "menu.pdf",
  //           image: { type: "jpeg", quality: 0.98 },
  //           html2canvas: { scale: 2 },
  //           jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  //         };

  //         // Generate PDF
  //         try {
  //           html2pdf().set(opt).from(htmlContent).save();
  //         } catch (pdfError) {
  //           console.error("Error generating PDF:", pdfError);
  //         }
  //       } else {
  //         console.error("Error: No valid content to convert to PDF.");
  //       }
  //     } else {
  //       console.error("Error: No content to convert to PDF.");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching content:", error);
  //   }
  // };

  useEffect(() => {
    if (selectedMenuId) {
      const selectedCategory = categoryWithProducts.data?.find(
        (category) => category.menuDatas._id === selectedMenuId
      );
      console.log("Selected Category:", selectedCategory);
      setSelectedCategory(selectedCategory || null);
    }
  }, [selectedMenuId]);


  return (
    <>
      <Menus
        categories={categoryWithProducts.data?.map((category) => ({
          _id: category.menuDatas._id,
          title: category.menuDatas.title,
        }))}
        onSubMenuClick={onSubMenuClick}
        selectedSubMenuId={selectedMenuId}
      />

      <Box sx={{ margin: "0 10%" }}>
        <Button id="printButton" variant="contained" onClick={generatePDF}>
          Print
        </Button>

        <Box>
          <Typography
            variant="h6"
            fontFamily="Dancing Script, cursive"
            sx={{
              color: theme.palette.primary.main,
              my: 1,
              fontWeight: 700,
              fontSize: "40px",
              lineHeight: "1.6",
              display: "flex",
              justifyContent: "start",
            }}
          >
            {selectedMenuId && selectedCategory?.menuDatas?.title}
          </Typography>

          <Grid container spacing={2} marginBottom={"18px"}>
            {(!selectedMenuId || selectedMenuId === "") &&
              categoryWithProducts.isSuccess &&
              categoryWithProducts.data?.map((category, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  lg={6}
                  key={index}
                  style={{ padding: 0 }}
                >
                  <Card
                    sx={{
                      maxWidth: 700,
                      margin: "auto",
                      boxShadow: "none",
                    }}
                  >
                    <CardContent sx={{ paddingTop: 0 }}>
                      <Typography
                        variant="h6"
                        fontFamily="Dancing Script, cursive"
                        sx={{
                          lineHeight: "2",
                          fontSize: "35px",
                          fontWeight: "bold",
                          display: "inline-block",
                          textDecoration: "none",
                          textWrap: "wrap",
                          color: theme.palette.primary.main,

                          "&:hover": {
                            color: "black",
                          },
                          "@media (max-width: 600px)": {
                            display: "block",
                            whiteSpace: "normal",
                            overflowWrap: "break-word",
                          },
                        }}
                      >
                        {category.menuDatas.title}
                      </Typography>

                      {category.menuDatas.products.map(
                        (product, productIndex) => (
                          <Grid item key={product._id}>
                            <Grid container alignItems="center">
                              <Grid item xs={5} md={4} sm={6}>
                                <Box
                                  alignItems={"center"}
                                  justifyContent={"center"}
                                  flexWrap={"wrap"}
                                >
                                  <Typography>{product.title}</Typography>
                                </Box>
                              </Grid>
                              <Grid
                                item
                                xs={1}
                                md={1}
                                sm={1}
                                lg={1}
                                textAlign="center"
                              >
                                .....
                              </Grid>
                              <Grid item xs={6} sm={5} md={5} paddingLeft={2}>
                                <Typography>
                                  {product.dailyMenuSizeWithPrice &&
                                  product.dailyMenuSizeWithPrice.length > 0
                                    ? product.dailyMenuSizeWithPrice.map(
                                        (sizePrice, priceIndex) => (
                                          <span key={priceIndex}>
                                            {sizePrice.size}/ ${" "}
                                            {sizePrice.price.toFixed(2)}
                                            {priceIndex !==
                                              product.dailyMenuSizeWithPrice
                                                .length -
                                                1 && ", "}
                                          </span>
                                        )
                                      )
                                    : ""}
                                </Typography>
                                <Typography>
                                  {product.itemSizeWithPrice &&
                                  product.itemSizeWithPrice.length > 0
                                    ? product.itemSizeWithPrice.map(
                                        (sizePrice, priceIndex) => (
                                          <span key={priceIndex}>
                                            {sizePrice.size}/ ${" "}
                                            {sizePrice.price.toFixed(2)}
                                            {priceIndex !==
                                              product.itemSizeWithPrice.length -
                                                1 && ", "}
                                          </span>
                                        )
                                      )
                                    : ""}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        )
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            {selectedCategory &&
              selectedCategory.menuDatas &&
              selectedCategory.menuDatas.products.map((product, index) => (
                <Grid item xs={12} sm={12} md={12} lg={12} key={index}>
                  <Grid container justifyContent={"start"}>
                    <Grid item xs={6} sm={4} md={2}>
                      <Box>
                        <Typography>{product.title}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={1} md={2} sm={1} lg={1} textAlign="center">
                      .....
                    </Grid>
                    <Grid
                      item
                      xs={5}
                      md={4}
                      sm={5}
                      textAlign="start"
                      paddingLeft={1}
                    >
                      <Typography>
                        {product.dailyMenuSizeWithPrice &&
                        product.dailyMenuSizeWithPrice.length > 0
                          ? product.dailyMenuSizeWithPrice.map(
                              (sizePrice, priceIndex) => (
                                <span key={priceIndex}>
                                  {sizePrice.size}/ ${" "}
                                  {sizePrice.price.toFixed(2)}
                                  {priceIndex !==
                                    product.dailyMenuSizeWithPrice.length - 1 &&
                                    ", "}
                                </span>
                              )
                            )
                          : ""}
                      </Typography>
                      <Typography>
                        {product.itemSizeWithPrice &&
                        product.itemSizeWithPrice.length > 0
                          ? product.itemSizeWithPrice.map(
                              (sizePrice, priceIndex) => (
                                <span key={priceIndex}>
                                  {sizePrice.size}/ ${" "}
                                  {sizePrice.price.toFixed(2)}
                                  {priceIndex !==
                                    product.itemSizeWithPrice.length - 1 &&
                                    ", "}
                                </span>
                              )
                            )
                          : ""}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
          </Grid>
        </Box>
      </Box>
      <div id="pdf-content" style={{ display: "none" }}>
        <MenuCardPdf pdfData={pdfData} />
      </div>
    </>
  );
}

export default MenuPage;
