import { createFile } from '@/utils/edgeFileUpload';
import { cloneDeep } from 'lodash';

const cliche: ClicheFormItem = {
  type: '',
  width: undefined,
  height: undefined
};

const product: ProductFormItem = {
  name: '',
  height: '',
  width: '',
  length: '',
  handle_id: null,
  lamination_id: null,
  paper_id: null,
  bottom: '',
  printed_bottom: '',
  front_back: '',
  spot_uv: '',
  hot_foil: '',
  hot_foil_cliches: [cloneDeep(cliche), cloneDeep(cliche), cloneDeep(cliche)],
  embossing: '',
  embossing_cliches: [cloneDeep(cliche), cloneDeep(cliche), cloneDeep(cliche)],
  outside_colors: [],
  inside_colors: [],
  quantity: '',
  comment: '',
  display_name: '',
  paper: {},
  handle: {},
  lamination: {},
  min_offer: 0,
  max_package_weight: 15
};

const offer: OfferFormItem = {
  name: '',
  days_to_delivery: undefined,
  price: undefined,
  product_id: undefined,
  product: cloneDeep(product)
};

const detail: DetailsFormItem = {
  address: '',
  alt_address: '',
  city: '',
  country_id: '',
  company: '',
  company_vat: '',
  name: '',
  phone: undefined
};

const order: OrderFormItem = {
  status: '',
  offer_id: '',
  shipping_detail_id: null,
  billing_detail_id: null,
  shipping_details: cloneDeep(detail),
  billing_details: cloneDeep(detail),
  offer: cloneDeep(offer)
};

const user: UserFormItem = {
  id: 0,
  username: '',
  email: '',
  first_name: '',
  last_name: '',
  password: '',
  password_confirmation: '',
  roles: [],
  roles_array: [],
  is_disabled: 0,
  country_id: '',
  uploaded_file: createFile('image/jpg'),
  json_data: '',
  company: '',
  phone: '',
  source: 'backend',
  contact_email: '',
  shipping_details: cloneDeep(detail),
  billing_details: cloneDeep(detail)
};

const slide: SlideFormItem = {
  id: 0,
  title: '',
  subtitle: '',
  description: '',
  image: '',
  learn_more_text: '',
  learn_more_link_custom: false,
  learn_more_link: '',
  learn_more_color: '',
  get_started_text: '',
  get_started_link_custom: false,
  get_started_link: '',
  get_started_color: '',
  uploaded_file: createFile('image/jpg')
};

const shipping: Object = {
  base_price: 0,
  price_kg: 0,
  min_price: 0,
  max_palete_weight: 0
};
const lamination: Object = {
  id: 0,
  order: 0,
  name: '',
  display_name: '',
  price: ''
};
const color: Object = {
  id: 0,
  order: 0,
  name: '',
  display_name: '',
  type: '',
  hex_value: ''
};
const combination: Object = {
  id: 0,
  order: 0,
  name: '',
  display_name: '',
  price: ''
};
const format: Object = {
  id: 0,
  order: 0,
  name: '',
  parts: '',
  gluing_coefficient: '',
  format_coefficient: ''
};
const paper: Object = {
  id: 0,
  order: 0,
  name: '',
  display_name: '',
  price: '',
  margin: '',
  type: '',
  weight: ''
};
const parameter: Object = {
  id: 0,
  order: 0,
  name: '',
  display_name: '',
  value: ''
};
const handle: Object = {
  id: 0,
  order: 0,
  name: '',
  display_name: '',
  fold: '',
  price: '',
  tying: '',
  height: '',
  width: ''
};

const appointment: AppointmentFormItem = {
  id: null,
  start: '',
  end: '',
  date: new Date().toISOString().split('T')[0],
  duration: 0,
  user_id: null,
  time : null,
  services: [],
  status: 1
};

export {
  product,
  order,
  offer,
  detail,
  cliche,
  user,
  slide,
  shipping,
  lamination,
  color,
  combination,
  format,
  paper,
  parameter,
  handle,
  appointment
};
