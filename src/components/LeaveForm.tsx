"use client"
import { Form, Button, DatePicker, Select, Input, message, Alert } from 'antd';
import { useState } from 'react';

const { RangePicker } = DatePicker;

const LeaveForm = ({ onSubmitted }: { onSubmitted: (dates: any[], type: string) => void }) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            const res = await fetch("/api/leave", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            if (res.ok) {
                setSuccess(true);

                message.success("Leave request submitted!");
                onSubmitted(values.dates, values.type);
            } else {
                message.error("Failed to submit request");
            }
        } catch {
            message.error("Error connecting to server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>

            {success && <Alert message="Leave request submitted!" type="success" showIcon closable />}

            <Form layout="vertical" onFinish={onFinish}>
                <Form.Item name="dates" label="Select Dates" rules={[{ required: true, message: 'Please select dates' }]}>
                    <RangePicker />
                </Form.Item>

                <Form.Item name="type" label="Leave Type" rules={[{ required: true, message: 'Select leave type' }]}>
                    <Select>
                        <Select.Option value="full">Full Day</Select.Option>
                        <Select.Option value="half">Half Day</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item name="notes" label="Notes (optional)">
                    <Input.TextArea rows={3} />
                </Form.Item>

                <Form.Item>
                    <Button className="submitBtn" type="primary" htmlType="submit" loading={loading}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>

        </>



    );
};

export default LeaveForm;
