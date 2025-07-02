import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

const ToolTip = ({ data, maxLength = 20 }: { data: string; maxLength?: number }) => {
    return (
        <>
            {
                data?.length <= maxLength ? <span>{data || "N/A"}</span> : (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <span>
                                    {data?.slice(0, maxLength) || "N/A"}{data?.length > maxLength && '...'}
                                </span>
                            </TooltipTrigger>
                            <TooltipContent className=''>
                                <p>{data}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )
            }
        </>

    );
};

export default ToolTip;
