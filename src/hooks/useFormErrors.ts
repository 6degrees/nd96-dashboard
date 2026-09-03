import { useEffect } from 'react';
;
import {toast} from "@/lib/toast/toast";

/*
|--------------------------------------------------------------------------
| useFormErrors Hook
|--------------------------------------------------------------------------
*/
export const useFormErrors = (error: any, form: any) => {
    useEffect(() => {
        const validationErrors = error?.errors || error;

        if (error && typeof error === 'object') {
            const formFields = form.getFieldsValue();
            const fieldNames = Object.keys(formFields);

            const cleanFields = fieldNames.map(name => ({
                name,
                errors: []
            }));

            const serverFieldErrors: any[] = [];

            Object.keys(validationErrors).forEach(key => {
                const errorMessages = Array.isArray(validationErrors[key]) ? validationErrors[key] : [validationErrors[key]];

                // Extract only string messages, and flatten if there are nested objects
                const sanitizedMessages: string[] = [];

                errorMessages.forEach((msg: any) => {
                    if (msg && typeof msg === 'object') {
                        Object.keys(msg).forEach(subKey => {
                            const subErrors = Array.isArray(msg[subKey]) ? msg[subKey] : [msg[subKey]];
                            subErrors.forEach((subMsg: any) => {
                                if (typeof subMsg === 'string') {
                                    sanitizedMessages.push(subMsg);
                                }
                            });
                        });
                    } else if (typeof msg === 'string') {
                        sanitizedMessages.push(msg);
                    }
                });

                const parsedKey = key.includes('.') ? key.split('.') : key;
                const mainKey = key.includes('.') ? key.split('.')[0] : key;

                if (key === '__all__' || (!fieldNames.includes(key) && !fieldNames.includes(mainKey))) {
                    sanitizedMessages.forEach((msg: string) => {
                        toast.error({message: msg,})
                    });
                } else {
                    serverFieldErrors.push({
                        name: parsedKey,
                        errors: sanitizedMessages
                    });
                }
            });

            form.setFields([...cleanFields, ...serverFieldErrors]);
        }

        if (!error) {
            const fields = form.getFieldsValue();
            const resetFields = Object.keys(fields).map(name => ({
                name,
                errors: []
            }));
            form.setFields(resetFields);
        }
    }, [error, form]);
};