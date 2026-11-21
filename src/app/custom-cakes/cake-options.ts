type Flavour = { name: string; description: string; crumb: string; icing: string };
const vanilla = { crumb: "#e6bb78", icing: "#fff6df" };
const chocolate = { crumb: "#684029", icing: "#a46e49" };
const berry = { crumb: "#d5b18a", icing: "#bd8494" };
const lemon = { crumb: "#eac96e", icing: "#fff9db" };
const carrot = { crumb: "#ac713d", icing: "#fff2dc" };
const coconut = { crumb: "#e0cda3", icing: "#fff2dc" };
const velvet = { crumb: "#943f3b", icing: "#fff2dc" };
const cake = (name: string, description: string, colours = vanilla): Flavour => ({ name, description, ...colours });

export const categories = [
  { id: "standard", name: "Standard" },
  { id: "gf", name: "Gluten-Free" },
  { id: "vegan", name: "Vegan" },
] as const;

export const flavourMenus = {
  standard: [
    cake("Fresh Cream Victoria", "Vanilla bean sponge, mascarpone cream and stewed raspberry compote, covered in Swiss meringue buttercream."),
    cake("Red Velvet", "Red vanilla buttermilk sponge with a hint of cocoa, filled and covered with whipped vanilla bean cream cheese frosting.", velvet),
    cake("Chocolate Ganache", "Cocoa-rich sponge, filled and covered with whipped double chocolate ganache.", chocolate),
    cake("Berry Earl Grey", "Earl Grey infused sponge with seasonal berry compote and bergamot cream cheese frosting, covered in mixed berry Swiss buttercream.", berry),
    cake("Spiced Carrot", "Spiced carrot cake with coconut, raisins and toasted walnuts, filled and covered with nutmeg cream cheese frosting. Contains nuts.", carrot),
    cake("Banana Dream", "Our signature banana cake. Contains nuts.", vanilla),
    cake("Cereal Sprinkle", "Our signature cereal sprinkle cake.", vanilla),
    cake("Black Forest", "Cocoa-rich sponge, cherry ganache, stewed black cherries and mascarpone cream, covered in cherry-infused double chocolate ganache.", chocolate),
    cake("Lemon Lavender Blueberry", "Lavender and lemon peel infused sponge with mascarpone cream, lemon curd and blueberry lavender compote, covered in preserved lemon Swiss meringue buttercream.", lemon),
    cake("Coconut Cardamom Passionfruit", "Coconut and cardamom sponge with passionfruit jam, macaroon crumble and cardamom meringue buttercream, covered in coconut cardamom Swiss buttercream.", coconut),
  ],
  gf: [
    cake("Fresh Cream Victoria", "Vanilla bean sponge, filled with mascarpone cream and stewed raspberry compote, covered in Swiss meringue buttercream."),
    cake("Red Velvet", "Red vanilla buttermilk sponge with a hint of cocoa, filled and covered with whipped vanilla bean cream cheese frosting.", velvet),
    cake("Carrot Cake (nuts)", "Spiced carrot cake with coconut, juicy raisins and toasted walnuts, filled and covered with nutmeg whipped cream cheese frosting.", carrot),
    cake("Earl Grey & Seasonal Berries", "Earl Grey loose leaf infused sponge, filled with seasonal berries compote and bergamot oil cream cheese frosting, covered in mixed berry Swiss buttercream.", berry),
    cake("Lemon Lavender & Blueberry", "Lavender and lemon peel infused sponge, filled with mascarpone cream, tangy lemon curd and blueberry lavender compote, covered in preserved lemon Swiss meringue buttercream.", lemon),
    cake("Chocolate Ganache Cake", "Cocoa-rich sponge, filled and covered with whipped double chocolate ganache.", chocolate),
    cake("Cardamom Coconut Passion Cake", "Coconut and cardamom sponge, filled with passionfruit jam, macaroon crumble and cardamom meringue buttercream, covered in coconut cardamom Swiss buttercream.", coconut),
    cake("Black Forest", "Cocoa-rich sponge, filled with cherry ganache, stewed black cherries and mascarpone cream, covered in cherry-infused double chocolate ganache.", chocolate),
  ],
  vegan: [
    cake("Victoria", "Vanilla bean sponge, filled with vanilla buttercream and stewed raspberry compote, covered in vanilla ‘meringue’ buttercream."),
    cake("Chocolate Cake", "Cocoa-rich sponge, filled and covered with whipped chocolate ‘meringue’ buttercream.", chocolate),
    cake("Lemon Lavender & Blueberry", "Lavender and lemon peel infused sponge, filled with tangy lemon buttercream and blueberry lavender compote, covered in preserved lemon ‘meringue’ buttercream.", lemon),
    cake("Almond Raspberry", "Almond sponge, filled with almond buttercream and raspberry compote, covered in beaten raspberry ‘meringue’ buttercream. Contains nuts.", berry),
    cake("Black Forest", "Cocoa-rich sponge, filled with chocolate buttercream, cherry ganache and stewed black cherries, covered in cherry-infused double chocolate ganache.", chocolate),
    cake("Cardamom Coconut Passion Cake", "Coconut and cardamom sponge, filled with passionfruit jam and coconut cardamom ‘meringue’ buttercream, covered in coconut cardamom buttercream.", coconut),
    cake("Berry Earl Grey", "Earl Grey loose leaf infused sponge, filled with seasonal berries compote and bergamot oil buttercream, covered in mixed berry ‘meringue’ buttercream.", berry),
    cake("Hazelnut Mocha Cake (nuts)", "Espresso cocoa-rich sponge, filled with whipped mocha hazelnut ‘meringue’ buttercream and toasted hazelnut praline, covered in hazelnut mocha buttercream.", chocolate),
  ],
  // Add confirmed recipes here when the combined menu is ready.
  veganGf: [] as Flavour[],
} satisfies Record<string, Flavour[]>;

// Existing sample base prices retained; the new 4-inch base price awaits confirmation.
export const sizes = [
  { inches: 4, serves: "2–3", price: null },
  { inches: 6, serves: "6–8", price: 85 },
  { inches: 8, serves: "10–20", price: 110 },
  { inches: 10, serves: "20–30", price: 140 },
] as const;
export const dietarySupplement = { 4: 2, 6: 5, 8: 5, 10: 7 } as const;

// Scoped to the custom builder; existing shop colour options remain unchanged.
export const customCakeColours = [
  { name: "Ivory", colour: "#fffaf0" },
  { name: "Baby Pink", colour: "#edbdc8" },
  { name: "Baby Blue", colour: "#bacde4" },
  { name: "Lilac", colour: "#c9b5d8" },
  { name: "Sage", colour: "#87956c" },
];
