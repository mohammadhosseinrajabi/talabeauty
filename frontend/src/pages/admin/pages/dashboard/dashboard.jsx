import React from "react";
import Card from "./card";
import ProducTable from "../product/producTable";

export default function Dashboard() {
  return (
    <div id="dashboard_section" className="dashboard_section main_section">
      <div className="row">
        <Card
        currentValue={7}
        title="سبد خرید امروز"
        desc=" سبد های خرید مانده امروز"
        icon="fas fa-shopping-basket"
        lastWeekValue={13}
        lastMonthValue={85}
        />
      
      <Card
        currentValue={5}
        title=" سفارشات مانده امروز"
        desc="  سفارشات معلق و فاقد پرداختی"
        icon="fas fa-dolly"
        lastWeekValue={13}
        lastMonthValue={845}
        />

<Card
        currentValue={5}
        title=" سفارشات امروز"
        desc="سفارشات کامل و دارای پرداختی"
        icon="fas fa-dolly"
        lastWeekValue={13}
        lastMonthValue={845}
        />
       


       <Card
        currentValue={5}
        title="درآمد امروز"
        desc=" جمع مبالغ پرداختی (تومان)"
        icon="fas fa-money-check-alt"
        lastWeekValue={13}
        lastMonthValue={845}
        />
 
   
      </div>

      {/* <div className="row">
        <div className="col-12 col-lg-6">
          <p className="text-center mt-3 text-dark">محصولات رو به اتمام</p>

        <ProducTable/>
        </div>

        <div className="col-12 col-lg-6">
          <canvas id="myChart" height="195"></canvas>
        </div>
      </div> */}
    </div>
  );
}
