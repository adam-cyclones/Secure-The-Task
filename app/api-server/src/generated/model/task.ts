/**
 * SecureTheTask API
 * API for SecureTheTask, a full-stack task management application.
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { RequestFile } from './models';

export class Task {
    'id'?: string;
    'title': string;
    'description'?: string;
    'status': string;
    'priority'?: number;
    'dueDate'?: Date;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "id",
            "baseName": "id",
            "type": "string"
        },
        {
            "name": "title",
            "baseName": "title",
            "type": "string"
        },
        {
            "name": "description",
            "baseName": "description",
            "type": "string"
        },
        {
            "name": "status",
            "baseName": "status",
            "type": "string"
        },
        {
            "name": "priority",
            "baseName": "priority",
            "type": "number"
        },
        {
            "name": "dueDate",
            "baseName": "dueDate",
            "type": "Date"
        }    ];

    static getAttributeTypeMap() {
        return Task.attributeTypeMap;
    }
}
