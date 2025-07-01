
import React, { ReactNode } from 'react';
import {useI18n} from "@/contexts/i18n";

interface PageTitleProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, description, action }) => {
    const i18n = useI18n()

  return (
    <div className="flex flex-wrap justify-between items-center gap-2">
      <div className="space-y-1">
        <h4 className="font-bold text-lg text-mainText">{i18n.t(title)}</h4>
        {description && <h6 className="text-sm text-secondaryText">{i18n.t(description)}</h6>}
      </div>
      {action}
    </div>
  );
};

export default PageTitle;
