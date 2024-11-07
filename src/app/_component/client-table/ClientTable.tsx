import React from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import ActionsOptions from './ActionsOptions';

const ClientTable = () => {
    const TableHeadData = [
        " ","CLT ID", "Name", "PAN", "Businesses", "Projects", "Wallet", "Manager", "KYC's", "Action"
    ];

    const TableData = [
        {
            id: 1,
            cltid:"USR001",
            name: "John Doe",
            pan: "INV001",
            businesses: "0",
            projects: "0",
            wallet: "250.00",
            manager: "John Doe",
            kyc: "Incomplete",
            action: <ActionsOptions/>
        },
        {
            id: 2,
            "cltid": "USR002",
            name: "Jane Smith",
            pan: "INV002",
            businesses: "0",
            projects: "0",
            wallet: "500.00",
            manager: "Jane Doe",
            kyc: "Incomplete",
            action: <ActionsOptions/>
        },
        {
            id: 3,
            "cltid": "USR003",
            name: "Sam Wilson",
            pan: "INV003",
            businesses: "0",
            projects: "0",
            wallet: "750.00",
            manager: "Sam Smith",
            kyc: "Incomplete",
            action: <ActionsOptions/>
        },
    ];

    return (
        <div className='flex justify-center items-center p-10 rounded-xl'>
            <Table className='rounded-xl'>
                <TableHeader className='bg-[#042559] rounded-2xl'>
                    <TableRow className='text-center font-bold'>
                        {
                            TableHeadData.map((header, index) => (
                                <TableCell key={index} className='text-white'>{header}</TableCell>
                            ))
                        }
                    </TableRow>
                </TableHeader>
                <TableBody className='bg-white'>
                    {
                        TableData.map((data) => (
                            <TableRow key={data.id} className='text-center'>
                                <TableCell className='w-full flex justify-center items-center'>
                                    <div className='w-10 h-10 rounded-full bg-slate-300 flex justify-center items-center'>
                                    </div>
                                </TableCell>
                                <TableCell className='text-[#042559] font-medium'>{data.cltid}</TableCell>
                                <TableCell className='text-red-600 font-medium'>{data.name}</TableCell>
                                <TableCell className='text-[#042559] font-medium'>{data.pan}</TableCell>
                                <TableCell className='text-[#042559] font-medium'>{data.businesses}</TableCell>
                                <TableCell className='text-[#042559] font-medium'>{data.projects}</TableCell>
                                <TableCell className='text-[#042559] font-medium'>₹{data.wallet}</TableCell>
                                <TableCell className='flex justify-center items-center'>
                                    <span className='w-10 h-10 rounded-full bg-slate-300 flex justify-center items-center'></span>
                                </TableCell>
                                <TableCell className=''>
                                    <span className='bg-red-600 py-2 px-3 rounded-full text-white w-[7rem] text-center'>
                                        {data.kyc}
                                    </span>
                                </TableCell>
                                <TableCell>{data.action}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    );
};

export default ClientTable;
