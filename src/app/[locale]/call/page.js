import FlowChart from "@/components/call/FlowChart";

export const metadata = {
  title: {
    absolute: "Call Care Not Violence"
  },
  description:
    "Flow chart on whether you should use healthy productive community support networks or should call the police. PDFs of available resources for Fairfax, Arlington, Alexandria, and Prince William County Virginia. Website created by Chris Thornburg, github:CJThornburg ",
};

// export const dynamic = "force-static";

export default function Call() {
  return <FlowChart />;
}
