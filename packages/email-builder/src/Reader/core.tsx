import React, { createContext, useContext } from 'react';
import { z } from 'zod';
import { buildBlockComponent, buildBlockConfigurationSchema } from '@usewaypoint/document-core';

import { useReaderBlockDictStore } from './config';

const ReaderContext = createContext<TReaderDocument>({});

function useReaderDocument() {
  return useContext(ReaderContext);
}

export const ReaderBlockSchema = useReaderBlockDictStore((state) =>
  buildBlockConfigurationSchema(state.getBlockDict())
);
export type TReaderBlock = z.infer<typeof ReaderBlockSchema>;

export const ReaderDocumentSchema = z.record(z.string(), ReaderBlockSchema);
export type TReaderDocument = Record<string, TReaderBlock>;

export type TReaderBlockProps = { id: string };
export function ReaderBlock({ id }: TReaderBlockProps) {
  const document = useReaderDocument();

  const BaseReaderBlock = useReaderBlockDictStore((state) => buildBlockComponent(state.getBlockDict()));
  return <BaseReaderBlock {...document[id]} />;
}

export type TReaderProps = {
  document: Record<string, z.infer<typeof ReaderBlockSchema>>;
  rootBlockId: string;
};
export default function Reader({ document, rootBlockId }: TReaderProps) {
  return (
    <ReaderContext.Provider value={document}>
      <ReaderBlock id={rootBlockId} />
    </ReaderContext.Provider>
  );
}
