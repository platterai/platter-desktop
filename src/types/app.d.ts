// ===== /v1/messages reponse item
export type IMessage = {
  id: string;
  role: string;
  userId: string | null;
  conversationId: string;
  message: string | null;
  text: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: {
    type: string;
    docs: any[];
    title?: string;
    table_json: any | null;
    chart_json: any | null;
  };
  status: string | null;
};

// ==== /v1/integrations response
export type IIntegrationItem = {
  id: string | null;
  userId: string | null;
  pivot: string;
  pivot_method: string;
  type_integrations: string;
  sync: string | null;
  syncAt: string | null;
  integration: string | null;
  totalFiles: number | null;
};

// ===== integration postgres form payload
type IIntegrationPostgresForm = {
  host: string | FormDataEntryValue | null;
  port: string | FormDataEntryValue | null;
  username: string | FormDataEntryValue | null;
  password: string | FormDataEntryValue | null;
  database: string | FormDataEntryValue | null;
};

// ========== FOR PLOTLY CHART DATA STRUCTURE
export interface IBarchart {
  data: Datum[];
  layout: BarchartLayout;
}
export interface Datum {
  alignmentgroup: string;
  hovertemplate: string;
  legendgroup: Legendgroup;
  marker: DatumMarker;
  name: Legendgroup;
  offsetgroup: Legendgroup;
  orientation: string;
  showlegend: boolean;
  textposition: string;
  x: Legendgroup[];
  xaxis: string;
  y: number[];
  yaxis: string;
  type: string;
}

export enum Legendgroup {
  Furniture = "Furniture",
  OfficeSupplies = "Office Supplies",
  Technology = "Technology",
}

export interface DatumMarker {
  color: string;
  pattern: PurplePattern;
}

export interface PurplePattern {
  shape: string;
}

export interface BarchartLayout {
  template: Template;
  xaxis: Xaxis;
  yaxis: Yaxis;
  legend: Legend;
  title: LegendTitle;
  barmode: string;
}

export interface Legend {
  title: LegendTitle;
  tracegroupgap: number;
}

export interface LegendTitle {
  text: string;
}

export interface Template {
  data: Data;
  layout: TemplateLayout;
}

export interface Data {
  histogram2dcontour: Contour[];
  choropleth: Choropleth[];
  histogram2d: Contour[];
  heatmap: Contour[];
  heatmapgl: Contour[];
  contourcarpet: Choropleth[];
  contour: Contour[];
  surface: Contour[];
  mesh3d: Choropleth[];
  scatter: ScatterElement[];
  parcoords: Parcoord[];
  scatterpolargl: PurpleScatter[];
  bar: Bar[];
  scattergeo: PurpleScatter[];
  scatterpolar: PurpleScatter[];
  histogram: Histogram[];
  scattergl: PurpleScatter[];
  scatter3d: Scatter3D[];
  scattermapbox: PurpleScatter[];
  scatterternary: PurpleScatter[];
  scattercarpet: PurpleScatter[];
  carpet: Carpet[];
  table: Table[];
  barpolar: Barpolar[];
  pie: Pie[];
}

export interface Bar {
  error_x: Font;
  error_y: Font;
  marker: BarMarker;
  type: string;
}

export interface Font {
  color: string;
}

export interface BarMarker {
  line: Line;
  pattern: FillpatternClass;
}

export interface Line {
  color: string;
  width: number;
}

export interface FillpatternClass {
  fillmode: string;
  size: number;
  solidity: number;
}

export interface Barpolar {
  marker: BarMarker;
  type: string;
}

export interface Carpet {
  aaxis: CarpetAaxis;
  baxis: CarpetAaxis;
  type: string;
}

export interface CarpetAaxis {
  endlinecolor: string;
  gridcolor: string;
  linecolor: string;
  minorgridcolor: string;
  startlinecolor: string;
}

export interface Choropleth {
  type: string;
  colorbar: Colorbar;
}

export interface Colorbar {
  outlinewidth: number;
  ticks: string;
}

export interface Contour {
  type: string;
  colorbar: Colorbar;
  colorscale: Array<Array<number | string>>;
}

export interface Histogram {
  marker: HistogramMarker;
  type: string;
}

export interface HistogramMarker {
  pattern: FillpatternClass;
}

export interface Parcoord {
  type: string;
  line: Coloraxis;
}

export interface Coloraxis {
  colorbar: Colorbar;
}

export interface Pie {
  automargin: boolean;
  type: string;
}

export interface ScatterElement {
  fillpattern: FillpatternClass;
  type: string;
}

export interface Scatter3D {
  type: string;
  line: Coloraxis;
  marker: Coloraxis;
}

export interface PurpleScatter {
  type: string;
  marker: Coloraxis;
}

export interface Table {
  cells: Cells;
  header: Cells;
  type: string;
}

export interface Cells {
  fill: Font;
  line: Font;
}

export interface TemplateLayout {
  autotypenumbers: string;
  colorway: string[];
  font: Font;
  hovermode: string;
  hoverlabel: Hoverlabel;
  paper_bgcolor: string;
  plot_bgcolor: string;
  polar: Polar;
  ternary: Ternary;
  coloraxis: Coloraxis;
  colorscale: Colorscale;
  xaxis: LayoutXaxis;
  yaxis: LayoutXaxis;
  scene: Scene;
  shapedefaults: Shapedefaults;
  annotationdefaults: Annotationdefaults;
  geo: Geo;
  title: PurpleTitle;
  mapbox: Mapbox;
}

export interface Annotationdefaults {
  arrowcolor: string;
  arrowhead: number;
  arrowwidth: number;
}

export interface Colorscale {
  sequential: Array<Array<number | string>>;
  sequentialminus: Array<Array<number | string>>;
  diverging: Array<Array<number | string>>;
}

export interface Geo {
  bgcolor: string;
  landcolor: string;
  subunitcolor: string;
  showland: boolean;
  showlakes: boolean;
  lakecolor: string;
}

export interface Hoverlabel {
  align: string;
}

export interface Mapbox {
  style: string;
}

export interface Polar {
  bgcolor: string;
  angularaxis: AngularaxisClass;
  radialaxis: AngularaxisClass;
}

export interface AngularaxisClass {
  gridcolor: string;
  linecolor: string;
  ticks: string;
}

export interface Scene {
  xaxis: ZaxisClass;
  yaxis: ZaxisClass;
  zaxis: ZaxisClass;
}

export interface ZaxisClass {
  backgroundcolor: string;
  gridcolor: string;
  linecolor: string;
  showbackground: boolean;
  ticks: string;
  zerolinecolor: string;
  gridwidth: number;
}

export interface Shapedefaults {
  line: Font;
}

export interface Ternary {
  bgcolor: string;
  aaxis: AngularaxisClass;
  baxis: AngularaxisClass;
  caxis: AngularaxisClass;
}

export interface PurpleTitle {
  x: number;
}

export interface LayoutXaxis {
  gridcolor: string;
  linecolor: string;
  ticks: string;
  title: FluffyTitle;
  zerolinecolor: string;
  automargin: boolean;
  zerolinewidth: number;
}

export interface FluffyTitle {
  standoff: number;
}

export interface Xaxis {
  anchor: string;
  domain: number[];
  title: LegendTitle;
  categoryorder: string;
  categoryarray: Legendgroup[];
}

export interface Yaxis {
  anchor: string;
  domain: number[];
  title: LegendTitle;
}
