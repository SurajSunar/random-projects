import { AutoComplete, Button, Form, Input } from "antd";
import { Search } from "lucide-react";
import { useState } from "react";
import CountryList from "country-list-with-dial-code-and-flag";

const countries = CountryList.getAll().map((row) => ({
  value: row.dialCode,
  label: row.name,
}));

const App = () => {
  const [form] = Form.useForm();
  const [options, setOptions] = useState([]);

  const searchCountry = (value) => {
    return !value
      ? [...countries]
      : [...countries].filter((country) =>
          country.label.toLowerCase().includes(value.toLowerCase())
        );
  };

  const submitForm = () => {
    console.log(form.getFieldValue());
  };

  const AutoCompleteField = ({ field }) => (
    <Form.Item name={field}>
      <AutoComplete
        name={field}
        options={options}
        onSearch={(search) => setOptions(() => searchCountry(search))}
        className="[&_div]:!rounded-none [&_div]:!rounded-l-lg !w-[100px]"
        suffixIcon={<Search className="w-4" />}
      />
    </Form.Item>
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className=" mx-auto lg:w-1/2 flex items-center h-screen">
        <div className="w-full h-[300px] bg-gray-200 rounded-xl p-10">
          <Form layout="vertical" onFinish={submitForm} form={form}>
            <Form.Item
              label="Mobile Number"
              name="mobile"
              rules={[{ required: true, message: "Please input your number!" }]}
            >
              <Input
                className="lg:!w-[70%] !rounded-none !rounded-r-lg [&_.ant-form-item]:!mb-0 [&_input]:!p-2"
                addonBefore={<AutoCompleteField field={"mobileCode"} />}
              ></Input>
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[{ required: true, message: "Please input your number!" }]}
            >
              <Input
                className="lg:!w-[70%] !rounded-none !rounded-r-lg [&_.ant-form-item]:!mb-0 [&_input]:!p-2"
                addonBefore={<AutoCompleteField field={"phoneCode"} />}
              ></Input>
            </Form.Item>

            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default App;
