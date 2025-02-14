import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogContent,
  IconButton,
  Avatar,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import Rating from "@mui/material/Rating";
import Carousel from "react-material-ui-carousel";
import axios from "axios";


const items = [
  {
    id: 1,
    name: "Notebooks Pack of 4 Books",
    description: "High-quality ruled notebook for school and office use.",
    price: 310,
    image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/13819311a.webp",
    additionalImages: [
      "https://cdn.fcglcdn.com/brainbees/images/products/583x720/13819307b.webp",
      "https://cdn.fcglcdn.com/brainbees/images/products/583x720/13819307c.webp",
      "https://cdn.fcglcdn.com/brainbees/images/products/583x720/13819307d.webp"
    ],
    stock: 310,
    reviews: [
      {
        username: "John Doe",
        profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
        rating: 4,
        comment: "Great quality notebooks, perfect for school.",
      },
      {
        username: "Jane Smith",
        profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
        rating: 5,
        comment: "Amazing product! Highly recommended.",
      },
    ],
  },
  // Other product items...
  {
    id: 2,
    name: "Multicoloured pen",
    description: "Smooth and long-lasting ballpoint pen.",
    price: 290,
    image: "https://m.media-amazon.com/images/I/4120mZ990kL._SY450_.jpg",
    additionalImages: [
      "https://m.media-amazon.com/images/I/51Jm2l-vrjL._SX300_SY300_QL70_FMwebp_.jpg",
      "https://m.media-amazon.com/images/I/515ViJFoC9L.jpg",
      "https://m.media-amazon.com/images/I/41ntIo4eZdL.jpg"
    ],
    stock: 190,
    reviews: [
      {
        username: "Alice Walker",
        profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
        rating: 4,
        comment: "Good pen, the colors are vibrant and smooth.",
      },
      {
        username: "Michael Brown",
        profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
        rating: 5,
        comment: "Best pens I've used, they write smoothly for a long time.",
      },
    ],
  },
  {
    id: 3,
    name: "Apsara Writing Kit - Multicolor",
    description: "Smooth and Efficient writing and erasing for school kids.",
    price: 550,
    image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/13210773a.webp",
    additionalImages: [
      "https://cdn.fcglcdn.com/brainbees/images/products/583x720/13210773a.webp",
      "https://cdn.fcglcdn.com/brainbees/images/products/583x720/13210773b.webp",
      "https://cdn.fcglcdn.com/brainbees/images/products/583x720/13210773e.webp"
    ],
    stock: 500,
    reviews: [
      {
        username: "Samantha Lee",
        profilePic: "https://randomuser.me/api/portraits/women/3.jpg",
        rating: 4,
        comment: "Great set, perfect for my little one to start learning to write.",
      },
      {
        username: "David Clark",
        profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
        rating: 5,
        comment: "My daughter loves this set, it helps her a lot with her writing practice.",
      },
    ],
  },
  {
    id: 4,
    name: "24 Pcs Solid Watercolor Paint Set",
    description: "High-quality paint for colouring purpose.",
    price: 619,
    image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/16207402a.webp",
    additionalImages: [
      "https://cdn.fcglcdn.com/brainbees/images/products/583x720/16207402b.webp",
      "https://cdn.fcglcdn.com/brainbees/images/products/583x720/16207402c.webp",
      "https://cdn.fcglcdn.com/brainbees/images/products/583x720/16207402d.webp"
    ],
    stock: 515,
    reviews: [
      {
        username: "Emily Davis",
        profilePic: "https://randomuser.me/api/portraits/women/4.jpg",
        rating: 5,
        comment: "Perfect set for beginners. The colors are vibrant and easy to mix.",
      },
      {
        username: "James Turner",
        profilePic: "https://randomuser.me/api/portraits/men/4.jpg",
        rating: 4,
        comment: "Great value for the price, but a bit difficult to clean the brushes.",
      },
    ],
  },
  {
    id: 5,
    name: "Kuber Industries Disney Mickey Mouse 15 inch Polyester School Bag",
    description: "Durable school bag with multiple compartments for kids.",
    price: 650,
    image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/8734655a.webp",
    additionalImages: [
      "https://th.bing.com/th/id/OIP.bei0h1gUsc9bfeQ7iodemgHaHa?rs=1&pid=ImgDetMain",
      "https://th.bing.com/th/id/OIP.382TlpOftH55E6XBV1WaBgHaHz?w=1404&h=1479&rs=1&pid=ImgDetMain",
      "https://m.media-amazon.com/images/I/81KC9jVuncL._SX569_.jpg"
    ],
    stock: 610,
    reviews: [
      {
        username: "Olivia Harris",
        profilePic: "https://randomuser.me/api/portraits/women/5.jpg",
        rating: 5,
        comment: "My son loves it! It's cute, spacious, and perfect for school.",
      },
      {
        username: "Jack Wilson",
        profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
        rating: 4,
        comment: "Good quality but a little smaller than I expected. Overall, great design.",
      },
    ],
  },
  {
  id: 5,
  name: "Kuber Industries Disney Mickey Mouse 15 inch Polyester School Bag",
  description: "Durable school bag with multiple compartments for kids.",
  price: 650,
  image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/8734655a.webp",
  additionalImages: [
    "https://th.bing.com/th/id/OIP.bei0h1gUsc9bfeQ7iodemgHaHa?rs=1&pid=ImgDetMain",
    "https://th.bing.com/th/id/OIP.382TlpOftH55E6XBV1WaBgHaHz?w=1404&h=1479&rs=1&pid=ImgDetMain",
    "https://m.media-amazon.com/images/I/81KC9jVuncL._SX569_.jpg"
  ],
  stock: 610,
  reviews: [
    {
      username: "Olivia Harris",
      profilePic: "https://randomuser.me/api/portraits/women/5.jpg",
      rating: 5,
      comment: "My son loves it! It's cute, spacious, and perfect for school."
    },
    {
      username: "Jack Wilson",
      profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
      rating: 4,
      comment: "Good quality but a little smaller than I expected. Overall, great design."
    }
  ]
},
{
  id: 6,
  name: "Motu Patlu Sipper Plastic Water Bottle (450 Ml, Multicolour, 1 Piece Sipper Water Bottle)",
  description: "Stainless steel water bottle with leak-proof lid.",
  price: 400,
  image: "https://media-uk.landmarkshops.in/cdn-cgi/image/h=831,w=615,q=85,fit=cover/max-new/1000011374050-1000011374049-22062022_01-2100.jpg",
  additionalImages: [
    "https://m.media-amazon.com/images/I/71W3BTK5WDL._SX569_.jpg",
    "https://m.media-amazon.com/images/I/71pLjVU1TlL._SL1500_.jpg",
    "https://m.media-amazon.com/images/I/71tLDnpNn4L._SL1500_.jpg"
  ],
  stock: 425,
  reviews: [
    {
      username: "Emily Clark",
      profilePic: "https://randomuser.me/api/portraits/women/3.jpg",
      rating: 5,
      comment: "Perfect water bottle for my child. No leaks and looks amazing!"
    },
    {
      username: "Liam Adams",
      profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
      rating: 3,
      comment: "The design is great, but the bottle feels a little flimsy."
    }
  ]
},
{
  id: 7,
  name: "Boboiboy Fusion 5 in 1 Stationery Set With Pencil Case Pencil Eraser",
  description: "Compact pencil box with multiple sections for organizing stationery.",
  price: 450,
  image: "https://media.landmarkshops.in/cdn-cgi/image/h=831,w=615,q=85,fit=cover/max-new/1000014254686-Multi-MULTI-1000014254686_01-2100.jpg",
  additionalImages: [
    "https://cdn.pixelbin.io/v2/black-bread-289bfa/HrdP6X/original/hamleys-product/494348493/665/494348493-1_4345.webp",
    "https://media.karousell.com/media/photos/products/2018/01/20/paw_patrol_5pcs_stationery_set_1516423044_e0025cd2.jpg",
    "https://media.karousell.com/media/photos/products/2023/8/24/paw_patrol_stationery_set_orig_1692856616_c5cbd926.jpg"
  ],
  stock: 350,
  reviews: [
    {
      username: "Sophia Green",
      profilePic: "https://randomuser.me/api/portraits/women/4.jpg",
      rating: 4,
      comment: "Love the variety of items in this set. Very useful for school!"
    },
    {
      username: "John Doe",
      profilePic: "https://randomuser.me/api/portraits/men/4.jpg",
      rating: 3,
      comment: "Good set, but some items could be better quality."
    }
  ]
},
{
  id: 8,
  name: "13in1 Pencil & Eraser Set - (Multicolor)",
  description: "Pencil and eraser set for stationery use.",
  price: 335,
  image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/12146107a.webp",
  additionalImages: [
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/12146107b.webp",
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/12146107c.webp",
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/12146107d.webp"
  ],
  stock: 235,
  reviews: [
    {
      username: "Ava Parker",
      profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
      rating: 5,
      comment: "Great set! My daughter loves all the colors and it's perfect for school."
    },
    {
      username: "Mason Lee",
      profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
      rating: 4,
      comment: "Nice set, but the erasers could be softer."
    }
  ]
},
{
  id: 9,
  name: "Camel - Oil Pastels - 50 Shades",
  description: "Best recommended for sketching purpose for kids.",
  price: 520,
  image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/90650a.webp",
  additionalImages: [
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/90650e.webp",
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/90650c.webp",
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/90650b.webp"
  ],
  stock: 50,
  reviews: [
    {
      username: "James Wilson",
      profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
      rating: 5,
      comment: "Great quality pastels for my young artist. The colors are vibrant."
    },
    {
      username: "Charlotte Scott",
      profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
      rating: 4,
      comment: "Perfect for kids. A bit expensive, but worth it."
    }
  ]
},

{
  id: 10,
  name: "Lunch Box",
  description: "Leak-proof tiffin box for carrying meals.",
  price: 570,
  image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/15454302a.webp",
  additionalImages: [
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/15454302f.webp",
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/15454302e.webp",
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/15454302b.webp"
  ],
  stock: 25,
  reviews: [
    {
      username: "Alice Thompson",
      profilePic: "https://randomuser.me/api/portraits/women/21.jpg",
      rating: 5,
      comment: "Excellent lunch box! Keeps my meals fresh and leak-proof.",
    },
    {
      username: "Chris Johnson",
      profilePic: "https://randomuser.me/api/portraits/men/45.jpg",
      rating: 4,
      comment: "Good quality but wish it was a bit larger for more food storage.",
    }
  ]
},
{
  id: 11,
  name: "Abacus Counting Frame -Blue",
  description: "Helps kids by making their math skills sharper",
  price: 480,
  image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/15892899b.webp",
  additionalImages: [
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/15892899f.webp",
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/15892899e.webp",
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/15892899c.webp"
  ],
  stock: 60,
  reviews: [
    {
      username: "Emily Roberts",
      profilePic: "https://randomuser.me/api/portraits/women/32.jpg",
      rating: 5,
      comment: "Great tool for helping my kids with basic math skills!",
    },
    {
      username: "Daniel Lewis",
      profilePic: "https://randomuser.me/api/portraits/men/60.jpg",
      rating: 4,
      comment: "Useful, but some of the beads were slightly stiff to move initially.",
    }
  ]
},
{
  id: 12,
  name: "Fancy Umbrella",
  description: "Compact and durable umbrella for rainy days.",
  price: 450,
  image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/16275653a.webp",
  additionalImages: [
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/16275653b.webp",
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/16275653c.webp",
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/16275653e.webp"
  ],
  stock: 15,
  reviews: [
    {
      username: "Sarah Williams",
      profilePic: "https://randomuser.me/api/portraits/women/12.jpg",
      rating: 5,
      comment: "Stylish and compact. Easy to carry around!",
    },
    {
      username: "Michael Scott",
      profilePic: "https://randomuser.me/api/portraits/men/37.jpg",
      rating: 4,
      comment: "Good umbrella, but could have been a bit bigger.",
    }
  ]
},
{
  id: 13,
  name: "Coloring Book for Kids",
  description: "Fun and creative coloring book for kids.",
  price: 220,
  image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/18652866a.webp",
  additionalImages: [
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/18652866d.webp",
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/18652866e.webp",
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/18652866c.webp"
  ],
  stock: 40,
  reviews: [
    {
      username: "Ava Clark",
      profilePic: "https://randomuser.me/api/portraits/women/50.jpg",
      rating: 5,
      comment: "Engaging and perfect for kids!"
    },
    {
      username: "James Wilson",
      profilePic: "https://randomuser.me/api/portraits/men/51.jpg",
      rating: 4,
      comment: "Good quality paper and creative designs."
    }
  ]
},
{
  id: 14,
  name: "Spiderman Pencil Box",
  description: "Efficient for carrying stationery sets for school.",
  price: 280,
  image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/13730303a.webp",
  additionalImages: [
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/13730303b.webp",
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/13730303e.webp",
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/13730303d.webp"
  ],
  stock: 30,
  reviews: [
    {
      username: "Oliver Martinez",
      profilePic: "https://randomuser.me/api/portraits/men/18.jpg",
      rating: 5,
      comment: "My kid loves the Spiderman design!"
    },
    {
      username: "Mia Lopez",
      profilePic: "https://randomuser.me/api/portraits/women/23.jpg",
      rating: 4,
      comment: "Good size, but the zipper could be smoother."
    }
  ]
},
{
  id: 15,
  name: "Projector table painting set - Multicolor",
  description: "Efficient for kids to learn sketching",
  price: 430,
  image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/10989798a.webp",
   additionalImages: [
      "https://cdn.fcglcdn.com/brainbees/images/products/583x720/10989798b.webp",
      "https://cdn.fcglcdn.com/brainbees/images/products/583x720/10989798c.webp",
      "https://cdn.fcglcdn.com/brainbees/images/products/583x720/10989798d.webp"
    ],
  stock: 100,
  reviews: [
    {
      username: "Emily Parker",
      profilePic: "https://randomuser.me/api/portraits/women/30.jpg",
      rating: 5,
      comment: "Fantastic set for kids! My daughter loves it."
    },
    {
      username: "Ryan Walker",
      profilePic: "https://randomuser.me/api/portraits/men/36.jpg",
      rating: 4,
      comment: "Good product but the projector light could be brighter."
    }
  ]
},
{
  id: 16,
  name: "Unicorn Themed Pouch",
  description: "Efficient for carrying stationery sets for school.",
  price: 280,
  image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/17957370a.webp",
  additionalImages: [
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/17957370b.webp",
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/17957370c.webp",
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/17957370d.webp"
  ],

  stock: 100,
  reviews: [
    {
      username: "Sophia Green",
      profilePic: "https://randomuser.me/api/portraits/women/41.jpg",
      rating: 5,
      comment: "Adorable pouch, perfect size for my daughter's school supplies."
    },
    {
      username: "Jacob Wright",
      profilePic: "https://randomuser.me/api/portraits/men/48.jpg",
      rating: 4,
      comment: "Nice design, but the zipper feels a bit flimsy."
    }
  ]
},
{
  id: 17,
  name: "Classmate Drawing Notebook Unruled 36 Pages",
  description: "Efficient for drawing and sketching.",
  price: 119,
  image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/604512a.webp",
  additionalImages: [
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/604512b.webp",
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/604512d.webp",
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/604512e.webp"
  ],

  stock: 100,
  reviews: [
    {
      username: "Lucas Taylor",
      profilePic: "https://randomuser.me/api/portraits/men/22.jpg",
      rating: 5,
      comment: "Great quality paper for sketching. Highly recommend."
    },
    {
      username: "Ava Roberts",
      profilePic: "https://randomuser.me/api/portraits/women/19.jpg",
      rating: 4,
      comment: "Good for beginners, but could have more pages."
    }
  ]
},
{
  id: 18,
  name: "Metal Open Compass - 9 Pcs Set | Geometry Box",
  description: "Efficient for doing geometrical figures for school.",
  price: 390,
  image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/10110983a.webp",
  additionalImages: [
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/10110983b.webp",
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/10110983c.webp",
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/10110983d.webp"
  ],

  stock: 100,
  reviews: [
    {
      username: "Ella Wilson",
      profilePic: "https://randomuser.me/api/portraits/women/29.jpg",
      rating: 5,
      comment: "Complete set for school geometry needs. Very sturdy!"
    },
    {
      username: "James Anderson",
      profilePic: "https://randomuser.me/api/portraits/men/27.jpg",
      rating: 4,
      comment: "Great quality, but the box could be more compact."
    }
  ]
},
{
  id: 19,
  name: "ZOE Happy Face Erasers - Yellow",
  description: "Efficient for erasing pencil scribblings.",
  price: 140,
  image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/15565181a.webp",
  additionalImages: [
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/15565181b.webp",
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/15565181c.webp",
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/15565181d.webp"
  ],

  stock: 100,
  reviews: [
    {
      username: "Mia Hall",
      profilePic: "https://randomuser.me/api/portraits/women/35.jpg",
      rating: 5,
      comment: "So cute and works perfectly! My kids love them."
    },
    {
      username: "William Martin",
      profilePic: "https://randomuser.me/api/portraits/men/31.jpg",
      rating: 4,
      comment: "Erasers are good, but they wear out quickly."
    }
  ]
},
{
  id: 20,
  name: "SKIP HOP ZOO SNACK CUP Pug",
  description: "Efficient for carrying snacks for kids.",
  price: 360,
  image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/17539059a.webp",
  additionalImages: [
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/17539059c.webp",
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/17539059d.webp",
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/17539059e.webp"
  ],
  stock: 100,
  reviews: [
    {
      username: "Isabella Thomas",
      profilePic: "https://randomuser.me/api/portraits/women/47.jpg",
      rating: 5,
      comment: "Very handy for snacks! Cute design too."
    },
    {
      username: "Oliver Moore",
      profilePic: "https://randomuser.me/api/portraits/men/52.jpg",
      rating: 4,
      comment: "Good size but the lid could fit more securely."
    }
  ]
},
{
  id: 21,
  name: "Smily kiddos Stationery Set Space Theme",
  description: "Spacious pencil case with multi-layer segmentation to hold many pens and pencils.",
  price: 280,
  image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/18295914a.webp",
  additionalImages: [
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/18295914b.webp",
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/18295914d.webp",
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/18295914e.webp"
  ],
  stock: 100,
  reviews: [
    {
      username: "Emily Jackson",
      profilePic: "https://randomuser.me/api/portraits/women/18.jpg",
      rating: 5,
      comment: "Perfect for organizing stationery. Highly recommend."
    },
    {
      username: "Liam Baker",
      profilePic: "https://randomuser.me/api/portraits/men/39.jpg",
      rating: 4,
      comment: "Great design but could be more spacious."
    }
  ]
},
{
  id: 22,
  name: "Jungle Magic Doodle Board - Green",
  description: "Best gift for kids' birthdays, return gifts, party gifts, festival gifts, school supplies.",
  price: 215,
  image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/17942197a.webp",
  additionalImages: [
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/17942197d.webp",
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/17942197e.webp",
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/17942197c.webp"
  ],
  stock: 100,
  reviews: [
    {
      username: "Sophia King",
      profilePic: "https://randomuser.me/api/portraits/women/45.jpg",
      rating: 5,
      comment: "Keeps my kids entertained for hours! Perfect gift idea."
    },
    {
      username: "Ethan White",
      profilePic: "https://randomuser.me/api/portraits/men/42.jpg",
      rating: 4,
      comment: "Nice product, but the marker dries out too quickly."
    }
  ]
},
{
  id: 23,
  name: "FLICK IN Stationery Set for Kids, School Supplies Stationery Kit Items",
  description: "Package includes a set of 6 stationery items for school use.",
  price: 420,
  image: "https://m.media-amazon.com/images/I/61DxX1zr+bL._SL1129_.jpg",
  additionalImages: [
    "https://m.media-amazon.com/images/I/514RrUv+OqL._SL1500_.jpg",
    "https://m.media-amazon.com/images/I/61brL3jxZaL._SL1500_.jpg",
    "https://m.media-amazon.com/images/I/51sPxy16uuL._SL1464_.jpg"
  ],

  stock: 100,
  reviews: [
    {
      username: "Amelia Harris",
      profilePic: "https://randomuser.me/api/portraits/women/20.jpg",
      rating: 5,
      comment: "Complete set, perfect for school use. Worth the price!"
    },
    {
      username: "Mason Clark",
      profilePic: "https://randomuser.me/api/portraits/men/33.jpg",
      rating: 4,
      comment: "Good quality, but I wish it had a sharper sharpener."
    }
  ]
},
{
  id: 24,
  name: "blank art canvas board panel",
  description: "Efficient for beginners for painting.",
  price: 360,
  image: "https://s.alicdn.com/@sc04/kf/H5e2fec3ff8d943839ddfc2a0e78c247c6.jpg_720x720q50.jpg",
  additionalImages: [
    "https://s.alicdn.com/@sc04/kf/H2f07ee5dc4414ee0816c37de702b5b13U.jpg_720x720q50.jpg",
    "https://s.alicdn.com/@sc04/kf/H2f89817d14f24dbdbc56bac0e6df3422C.jpg_720x720q50.jpg",
    "https://s.alicdn.com/@sc04/kf/He5ce49df35904ffaafd0641f4b493a16N.jpg_720x720q50.jpg"
  ],
  stock: 100,
  reviews: [
    {
      username: "Sophia Davis",
      profilePic: "https://randomuser.me/api/portraits/women/45.jpg",
      rating: 5,
      comment: "Great quality canvas for beginners and kids!"
    },
    {
      username: "Liam Johnson",
      profilePic: "https://randomuser.me/api/portraits/men/18.jpg",
      rating: 4,
      comment: "Good value for the price, but packaging could be better."
    }
  ]
},
{
  id: 25,
  name: "Space Theme Sharpener - Dark Blue",
  description: "Adorable & highly appealing sharpener for kids",
  price: 150,
  image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/15564918a.webp",
  additionalImages: [
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/15564918b.webp",
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/15564918c.webp",
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/15564918f.webp"
  ],
  stock: 100,
  reviews: [
    {
      username: "Ella Martinez",
      profilePic: "https://randomuser.me/api/portraits/women/22.jpg",
      rating: 5,
      comment: "Super cute design and works efficiently. My kids love it!"
    },
    {
      username: "Noah Smith",
      profilePic: "https://randomuser.me/api/portraits/men/39.jpg",
      rating: 4,
      comment: "Good sharpener, but slightly overpriced for the size."
    }
  ]
},
{
  id: 26,
  name: "Pencils Set -36 Pieces",
  description: "Pencil sets are the perfect gift for your young ones",
  price: 220,
  image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/15565168f.webp",
  additionalImages: [
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/15565168b.webp",
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/15565168c.webp",
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/15565168d.webp"
  ],

  stock: 100,
  reviews: [
    {
      username: "Mia Wilson",
      profilePic: "https://randomuser.me/api/portraits/women/32.jpg",
      rating: 5,
      comment: "Excellent pencils! The set lasts for months and writes smoothly."
    },
    {
      username: "James Brown",
      profilePic: "https://randomuser.me/api/portraits/men/29.jpg",
      rating: 4,
      comment: "Great product, but would have loved if it came with erasers."
    }
  ]
},
{
  id: 27,
  name: "Happy Bedtime Stories - English",
  description: "Thoughtful compilation of classic stories",
  price: 230,
  image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/10454356a.webp",
  additionalImages: [
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/10454356b.webp",
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/10454356c.webp",
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/10454356d.webp"
  ],
  stock: 100,
  reviews: [
    {
      username: "Olivia Garcia",
      profilePic: "https://randomuser.me/api/portraits/women/56.jpg",
      rating: 5,
      comment: "Beautiful stories for kids. My son insists on one story every night!"
    },
    {
      username: "Ethan White",
      profilePic: "https://randomuser.me/api/portraits/men/36.jpg",
      rating: 5,
      comment: "Very well-written stories with good morals. Great buy."
    }
  ]
},
{
  id: 28,
  name: "Marvel Spiderman School Backpack",
  description: "The bag is suitable for school-going children.",
  price: 568,
  image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/14058203a.webp",
  additionalImages: [
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/14058203b.webp",
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/14058203c.webp",
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/14058203d.webp"
  ],
  stock: 100,
  reviews: [
    {
      username: "Isabella Lee",
      profilePic: "https://randomuser.me/api/portraits/women/67.jpg",
      rating: 5,
      comment: "Amazing design! My kid is obsessed with Spiderman and loves this bag."
    },
    {
      username: "Alexander Walker",
      profilePic: "https://randomuser.me/api/portraits/men/44.jpg",
      rating: 4,
      comment: "Good quality backpack but could use more compartments."
    }
  ]
},
{
  id: 29,
  name: "8 in 1 Easel board",
  description: "Make your kid's learning time more interesting and fun with this Board Easel.",
  price: 597,
  image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/9303149a.webp",
  additionalImages: [
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/9303149b.webp",
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/9303149e.webp",
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/9303149g.webp"
  ],
  stock: 100,
  reviews: [
    {
      username: "Emily Robinson",
      profilePic: "https://randomuser.me/api/portraits/women/52.jpg",
      rating: 5,
      comment: "Perfect for kids! Helps them explore their creativity. Sturdy and durable."
    },
    {
      username: "Daniel Allen",
      profilePic: "https://randomuser.me/api/portraits/men/25.jpg",
      rating: 4,
      comment: "Great product but slightly expensive."
    }
  ]
},
{
  id: 30,
  name: "School Bus Shape Metal Pencil Box",
  description: "Metal pencil box with unique toy vehicle bus pattern",
  price: 342,
  image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/11083968a.webp",
  additionalImages: [
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/11083968c.webp",
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/11083968d.webp",
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/11083968b.webp"
  ],
  stock: 100,
  reviews: [
    {
      username: "Chloe Perez",
      profilePic: "https://randomuser.me/api/portraits/women/46.jpg",
      rating: 5,
      comment: "My son loves the bus design! Super cute and spacious."
    },
    {
      username: "Michael Scott",
      profilePic: "https://randomuser.me/api/portraits/men/40.jpg",
      rating: 4,
      comment: "Good quality, but the latch could be sturdier."
    }
  ]
},
{
  id: 31,
  name: "Full Sleeves Shark Theme Hooded Rain Coat",
  description: "Efficient for kids in rain",
  price: 478,
  image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/11652633a.webp",
  additionalImages: [
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/11652633b.webp",
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/11652633d.webp",
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/11652633c.webp"
  ],

  stock: 100,
  reviews: [
    {
      username: "Ava Rivera",
      profilePic: "https://randomuser.me/api/portraits/women/35.jpg",
      rating: 5,
      comment: "Kept my kid dry in heavy rain. The shark design is a hit!"
    },
    {
      username: "William Young",
      profilePic: "https://randomuser.me/api/portraits/men/50.jpg",
      rating: 5,
      comment: "Great raincoat, fits well and looks adorable."
    }
  ]
},
{
  id: 32,
  name: "Puffy Original A4 Stickers",
  description: "Barbie A4 Foam Sparkle Sticker is ideal to stimulate the imagination of your kids.",
  price: 180,
  image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/13311925a.webp",
  additionalImages: [
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/13311925b.webp",
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/13311925d.webp",
    "https://cdn.fcglcdn.com/brainbees/images/products/583x720/13311925e.webp"
  ],
  stock: 100,
  reviews: [
    {
      username: "Mila Adams",
      profilePic: "https://randomuser.me/api/portraits/women/29.jpg",
      rating: 5,
      comment: "Kids loved these stickers! Perfect for art and crafts."
    },
    {
      username: "Lucas Mitchell",
      profilePic: "https://randomuser.me/api/portraits/men/30.jpg",
      rating: 4,
      comment: "Good quality but slightly expensive for the quantity."
    }
  ]
}

];

const ProductDetails = ({ productId }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = items.find((item) => item.id === parseInt(id));
  const [reviews, setReviews] = useState([]);
  const [username, setUsername] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [newReview, setNewReview] = useState({
    username: "",
    rating: 0,
    comment: "",
    profilePic: "",
  });
  const [open, setOpen] = useState(false);
  const [zoomedImage, setZoomedImage] = useState("");

  if (!product) {
    return <Typography variant="h5">Product not found</Typography>;
  }
  // Handle Buy Now Button Click
  const handleBuyNow = (item) => {
    navigate("/checkout", { state: { item } }); // Pass selected item to checkout page
  };

  const handleImageClick = (image) => {
    setZoomedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setZoomedImage("");
  };
  const addToCart = async (item) => {
    try {
      // Send item details to your cart API endpoint
      const response = await axios.post("http://localhost:5000/api/cart", {
        name: item.name,
        price: item.price,
        image: item.image,
        description: item.description,
      });
  
      if (response.status === 201 || response.status === 200) {
        alert(`${item.name} has been added to the cart!`);
      }
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      alert("An error occurred while adding the item to the cart. Please try again.");
    }
  };
  // ✅ Fetch only the reviews for the current product
  const fetchReviews = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/reviews/${productId}`);
      setReviews(res.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews(); // Load reviews when the component mounts
  }, [productId]); // Refetch if productId changes
 // ✅ Handle Image Upload
 const handleImageChange = (e) => {
  setNewReview({ ...newReview, profilePic: e.target.files[0] });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!newReview.username || !newReview.rating || !newReview.comment) {
    alert("Please fill in all required fields.");
    return;
  }

  const formData = new FormData();
  formData.append("productId", productId); // ✅ Ensuring review is linked to correct product
  formData.append("username", newReview.username);
  formData.append("rating", newReview.rating);
  formData.append("comment", newReview.comment);
  if (newReview.profilePic) formData.append("profilePic", newReview.profilePic);

  try {
    await axios.post("http://localhost:5000/api/reviews", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    fetchReviews(); // ✅ Refresh only the reviews for this product

    // ✅ Reset form after successful submission
    setNewReview({ username: "", rating: 0, comment: "", profilePic: null });
  } catch (error) {
    console.error("Error submitting review:", error);
    alert("Failed to submit review. Please try again.");
  }
};


// ✅ Delete Review
const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/reviews/${id}`);
    setReviews(reviews.filter((review) => review._id !== id));
  } catch (error) {
    console.error("Error deleting review:", error);
  }
};
return (
  <Box
    sx={{
      minHeight: "90vh",
      width: "1277px",
      backgroundColor: "#fff",
      padding: 4,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <Box sx={{ position: "relative", width: "100%" }}>
      <Button
        variant="contained"
        onClick={() => navigate("/")}
        sx={{
          position: "fixed",
          top: 195,
          right: 140,
          backgroundColor: "lightblue",
          color: "black",
          fontWeight: "bold",
          padding: "9px 9px",
          width: "80px",
          '&:hover': { backgroundColor: "red" },
        }}
      >
        Back
      </Button>

      <Grid container spacing={4} justifyContent="center" alignItems="flex-start">
        <Grid item xs={12} md={7}>
          <Carousel
            navButtonsAlwaysVisible
            indicators={false}
            animation="slide"
            sx={{ boxShadow: 3, borderRadius: 2, maxHeight: "300px" }}
          >
            {[product.image, ...product.additionalImages].map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Slide ${index}`}
                style={{
                  width: "100%",
                  maxHeight: "300px",
                  objectFit: "contain",
                  borderRadius: 2,
                  cursor: "pointer",
                }}
                onClick={() => handleImageClick(img)}
              />
            ))}
          </Carousel>
        </Grid>

        <Grid item xs={12} md={5}>
          <Box sx={{ textAlign: "left", width: "100%" }}>
            <Typography variant="h4" fontWeight="bold" color="black" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              {product.description}
            </Typography>
            <Typography variant="h5" color="green" fontWeight="bold" gutterBottom>
              ₹{product.price}
            </Typography>
            <Typography variant="body1" color={product.stock > 0 ? "green" : "red"} fontWeight="bold" gutterBottom>
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </Typography>
            <Box display="flex" justifyContent="flex-start" gap={2} mt={2}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddShoppingCartIcon />}
                sx={{ color: "yellow", borderColor: "black", fontWeight: "bold", padding: "10px 20px" }}
                disabled={product.stock === 0}
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </Button>
              <Button
                variant="contained"
                color="secondary"
                sx={{ color: "yellow", borderColor: "black", fontWeight: "bold", padding: "10px 20px" }}
                onClick={() => handleBuyNow(product)} // Redirect to checkout with item data
              >
                Buy Now
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>

    <Typography variant="h4" fontWeight="bolder" color="black" fontFamily={"cursive"} mt={5}>
      Customer Reviews
    </Typography>
    {reviews.length > 0 ? (
      <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 2, mt: 4 }}>
        {reviews.map((review) => (
          <Box key={review._id} sx={{ width: '300px', padding: 2, border: '1px solid #ddd', borderRadius: 2, boxShadow: 2 }}>
            <Avatar
              src={`http://localhost:5000${review.profilePic}`}
              alt={review.username}
              sx={{ width: 50, height: 50, cursor: "pointer", mb: 2 }}
              onClick={() => handleImageZoom(`http://localhost:5000${review.profilePic}`)}
            />
            <Typography variant="h6" fontWeight="bold" color="primary">
              {review.username}
            </Typography>
            <Rating value={review.rating} readOnly sx={{ mb: 1 }} />
            <Typography variant="body2" color="black" fontFamily={"times"} fontWeight={"bolder"}>
              {review.comment}
            </Typography>
            <Button variant="contained" color="secondary" onClick={() => handleDelete(review._id)}>
              Delete
            </Button>
          </Box>
        ))}
      </Box>
    ) : (
      <Typography>No reviews yet.</Typography>
    )}

    <Typography variant="h4" mt={3} color="green" fontFamily={"times"} fontWeight={"bolder"}>
      Leave a Review
    </Typography>
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <TextField
        label="Name"
        fullWidth
        value={newReview.username}
        onChange={(e) => setNewReview({ ...newReview, username: e.target.value })}
        required
        sx={{ mb: 2 }}
      />
      <Rating
        value={newReview.rating}
        onChange={(event, newValue) => setNewReview({ ...newReview, rating: newValue })}
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Comment"
        fullWidth
        multiline
        rows={3}
        value={newReview.comment}
        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
        required
        sx={{ mb: 2 }}
      />
      <input
        type="file"
        accept="image/*"
        color="black"
        onChange={handleImageChange}
        style={{ marginBottom: "16px" }}
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Submit Review
      </Button>
    </form>
  </Box>
);
}
export default ProductDetails;
