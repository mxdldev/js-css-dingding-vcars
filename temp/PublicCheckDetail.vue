<template>
    <div class="page-main" style="display:block;">
        <div class="page-item">
            <div class="left">设备上报里程：</div>
            <div class="right" v-if="tripSetV2.Distance">{{tripSetV2.Distance}}公里</div>
            <div class="righ" v-else>-</div>
        </div>
        <div class="page-item">
            <div class="left">人工上报里程：</div>
            <div class="right" v-if="returnApproveInfo.ManualMileage">{{returnApproveInfo.ManualMileage}}公里</div>
            <div class="righ" v-else>-</div>
        </div>
        <div class="page-item" v-if="config.Mileage.Visible">
            <div class="left">核实里程：</div>
            <div class="right" v-if="returnApproveInfo.TripMileage">{{returnApproveInfo.TripMileage}}公里</div>
            <div class="right" v-else>-</div>
        </div>
        <div class="page-item" v-if="config.Cost.Visible">
            <div class="left">核实费用：</div>
            <div class="right" v-if="returnApproveInfo.Cost">
                <span style="color:#FF5B47">{{returnApproveInfo.Cost}}</span>元
            </div>
            <div class="right" v-else>-</div>
        </div>
        <div class="page-item" v-if="config.VehicleCondition.Visible">
            <div class="left">车况：</div>
            <div class="right">{{returnApproveInfo.VehicleCondition}}</div>
        </div>

        <div class="page-item">
            <div class="left">操作人：</div>
            <div class="right blue"><span v-on:click="chat(returnApproveInfo.OperatorUserInfo.Id)">{{returnApproveInfo.OperatorUserInfo.Name}}</span>
            </div>
        </div>
        <div class="page-item">
            <div class="left">操作时间：</div>
            <div class="right">{{returnApproveInfo.OperationTime.substr(0,16)}}</div>
        </div>
        <div class="page-item">
            <div class="left">审核结果：</div>
            <div class="right" style="color: #15BC83">{{returnApproveInfo.Status == 0 ? "回车审核已通过":"拒绝"}}</div>
        </div>
        <div class="page-item" v-if="config.Remarks.Visible">
            <div class="left">备注：</div>
            <div class="right word-break">{{returnApproveInfo.Content ? returnApproveInfo.Content:"无"}}</div>
        </div>
        <div class="page-item" v-if="config.Attachments.Visible">
            <div class="left">照片：</div>
            <div class="right">
                <div v-if="returnApproveInfo.Attachments" class="pic-content">
                    <div v-for="(item,index) in returnApproveInfo.Attachments.split(',')" v-bind:key="index">
                        <img v-bind:src="item" v-on:click="imgItemClick(item,returnApproveInfo.Attachments.split(','))"
                             class="square-pic">
                    </div>
                </div>
                <div v-else>
                    无
                </div>
            </div>
        </div>
        <div class="obd-header">
            <span class="obd-title-big">设备上报数据</span><span class="obd-title-small">(数据由车载智能硬件采集)</span>
            <span v-if="tripSet != null && tripSet.length"
                  @click="showAllTripInfo = true"
                  style="flex: 1;text-align: right; padding-right: 5px;font-size: 0.28rem; color: rgb(50, 150, 250); float: right; opacity: 1;cursor: pointer">
              完整轨迹</span>
        </div>
        <div class="obd-content">
            <div class="obd-item">
                <span style="font-size: 0.4rem;color: #222222;font-weight: bold">{{tripSetV2.Distance}}</span>
                <div>
                    <img src="../../assets/image/dashboard.png" class="icon"/>
                    <span class="offset">里程(公里)</span>
                </div>
            </div>
            <div class="obd-item">
                <span style="font-size: 0.4rem;color: #222222;font-weight: bold">{{tripSetV2.FuelBills}}</span>
                <div>
                    <img src="../../assets/image/time-circle.png" class="icon"/>
                    <span class="offset">费用(元)</span>
                </div>
            </div>
            <div class="obd-item" style="flex:1.2 0 0rem;">
                <span style="font-size: 0.4rem;color: #222222;font-weight: bold">{{tripSetV2.AverageOil}}</span>
                <div>
                    <img src="../../assets/image/account book.png" class="icon"/>
                    <span class="offset">油耗(升/百公里)</span>
                </div>
            </div>
        </div>
        <div class="trip-main" style="margin-bottom: 1.2rem">
            <div class="trip-item" v-for="(item,index) in tripSet" v-bind:key="index" @click="showTrip(item)">
                <div style="width: 1.1rem"></div>
                <div class="trip-middle">
                    <span class="trip-address">{{item.FirstPosDesc}}</span>
                    <span class="trip-time-start">{{item.DtCheckStart.substr(11, 5)}}</span>
                    <span class="trip-top-cricle"/>
                    <span class="trip-up-line"/>
                    <span class="trip-middle-cricle"/>
                    <span class="trip-down-line"/>
                    <span class="trip-bottom-cricle"/>
                    <span class="trip-distance-oil">里程 {{item.Distance}}公里  油费 {{item.FuelBills}}元</span>
                    <!--<span class="trip-score">{{item.Mark}}</span>-->
                    <!--<span class="trip-score-title">驾驶得分</span>-->
                    <span class="trip-time-end">{{item.DtCheckEnd.substr(11, 5)}}</span>
                    <span class="trip-address">{{item.LastposDesc}}</span>
                </div>
                <div style="width: 1.33rem"></div>
            </div>
        </div>
        <div class="blue-box">
            <div class="blue-btn" v-on:click="goBack">返回</div>
        </div>
        <div class="trip-info" v-if="showAllTripInfo">
            <AllTripInfo @closeTripInfo="showAllTripInfo = false"
                         :IsIntercept="false"
                         :endTime="endTime"
                         :startTime="startTime"
                         :vid="vehicleId"></AllTripInfo>
        </div>
        <div class="trip-info" v-if="showTipInfo">
            <trip-info @closeTripInfo="showTipInfo = false"
                       :tid="tid"
                       :vid="vid"
                       :IsIntercept="IsIntercept"
                       :endTime="endTime"
                       :startTime="startTime"></trip-info>
        </div>
    </div>
</template>

<script>
    import {callPhone, chat, imgItemClick, isMobile,getVehicleSetting} from "../../assets/js/common_detail";
    import UseCarFieldType from "../../assets/js/UseCarFieldType";
    import AllTripInfo from "../../components/AllTripInfo";
    import TripInfo from "../../components/TripInfo";

    export default {
        name: "PublicDepartureDetail",
        data() {
            return {
                tid: "",
                vid: "",
                IsIntercept: false,
                showTipInfo: false,
                showAllTripInfo: false,
                returnApproveInfo: {
                    Id: "",
                    ReturnVehicleRecordId: "",
                    TripMileage: 0,
                    Cost: 0,
                    VehicleCondition: "",
                    ApproveTime: "",
                    Attachments: "",
                    Content: "",
                    Status: 0,
                    MileageCost: null,
                    OtherCost: null,
                    OperatorUserInfo: null,
                    OperationTime: ""
                },
                startTime: "",
                endTime: "",
                vehicleId: "",
                tripSet: [],
                tripSetV2: "",
                config: {
                    Mileage: {
                        Required: false,
                        ValueRange: "",
                        Visible: true
                    },
                    Cost: {
                        Required: false,
                        ValueRange: "",
                        Visible: true
                    },
                    Attachments: {
                        Required: false,
                        ValueRange: "",
                        Visible: true
                    },
                    VehicleCondition: {
                        Required: false,
                        ValueRange: "",
                        Visible: false
                    },
                    Remarks: {
                        Required: false,
                        ValueRange: "",
                        Visible: true
                    },
                    Track: {
                        Required: false,
                        ValueRange: null,
                        Visible: false
                    }
                }
            };
        },
        components: {
            AllTripInfo,
            TripInfo
        },
        created() {
            //var useVehicleInfo = this.$route.params.applyInfo.UseVehicleInfo;

            let data = window.localStorage.getItem("applyInfo");
            var applyDataInfo = JSON.parse(data);
            var useVehicleInfo = applyDataInfo.UseVehicleInfo;

            this.startTime = useVehicleInfo.StartTime;
            this.endTime = useVehicleInfo.EndTime;
            this.vehicleId = useVehicleInfo.VehicleId;
            //this.returnApproveInfo = this.$route.params.applyInfo.ReturnApproveInfo;
            this.returnApproveInfo = applyDataInfo.ReturnApproveInfo;

            //获取设置数据
            var vehicleSetting = JSON.parse(window.localStorage.getItem("vehicleSetting"));
            this.config = this.getVehicleSetting(vehicleSetting, UseCarFieldType.ReturnCheck);

            this.getTrip();
        },
        methods: {
            showTrip(data) {
                this.tid = data.RtrIpId;
                this.vid = this.vehicleId;
                this.IsIntercept = data.IsIntercept;
                this.showTipInfo = true;
            },
            callPhone, chat, imgItemClick, isMobile,getVehicleSetting,
            getTrip() {
                if (!this.startTime || !this.endTime || !this.vehicleId) {
                    return;
                }

                this.http.Get(this.APIS.VehicleManage.GetTripSetV2, {
                    vehicleId: this.vehicleId,
                    startTime: this.startTime,
                    endTime: this.endTime
                }).then(res => {
                    this.tripSetV2 = res.data;
                    if (res.data.TripSet) {
                        this.tripSet = res.data.TripSet;
                    }
                });
            },
            goBack() {
                this.$router.back();
            }
        }
    };
</script>

<style scoped>
    @import "../../assets/css/common_detail.css";
    /*历史行程样式开始*/
    .trip-main {
        width: 100%;
        background: #ffffff;
    }

    .trip-item {
        display: flex;
        flex-direction: row;
        position: relative;
        padding: 0.4rem 0;
        border-bottom: 0.01rem solid #F2F3F4;
        margin: 0 0.32rem;
    }

    .trip-middle {
        display: flex;
        flex-direction: column;
        flex: 1;
        margin: 0 0.16rem 0 0.16rem;
        height: 1.6rem;
        justify-content: space-between
    }

    .trip-address {
        font-size: 0.3rem;
        color: #333333;
        line-height: 1.3;
    }

    .trip-time-start {
        font-size: 0.26rem;
        color: #999999;
        position: absolute;
        top: 0.4rem;
        left: 0
    }

    .trip-time-end {
        font-size: 0.26rem;
        color: #999999;
        position: absolute;
        bottom: 0.4rem;
        left: 0;
    }

    .trip-top-cricle {
        width: 0.1rem;
        height: 0.1rem;
        background: #ffffff;
        border: 0.05rem solid #4CAF50;
        border-radius: 50%;
        position: absolute;
        top: 0.4rem;
        left: 0.88rem
    }

    .trip-up-line {
        width: 0.02rem;
        height: 0.6rem;
        background: #DEDEDE;
        position: absolute;
        top: 0.6rem;
        left: 0.96rem
    }

    .trip-middle-cricle {
        width: 0.06rem;
        height: 0.06rem;
        background: #CCCCCC;
        border-radius: 50%;
        position: absolute;
        top: 1.14rem;
        left: 0.945rem
    }

    .trip-down-line {
        width: 0.02rem;
        height: 0.6rem;
        background: #DEDEDE;
        position: absolute;
        top: 1.14rem;
        left: 0.96rem
    }

    .trip-bottom-cricle {
        width: 0.1rem;
        height: 0.1rem;
        background: #ffffff;
        border: 0.05rem solid #EF5350;
        border-radius: 50%;
        position: absolute;
        top: 1.74rem;
        left: 0.88rem
    }

    .trip-distance-oil {
        font-size: 0.26rem;
        color: #999999;
        line-height: 1
    }

    .trip-score {
        font-size: 0.4rem;
        color: #1E88E5;
        font-weight: bold;
        position: absolute;
        top: 0.82rem;
        right: 0.3rem
    }

    .trip-score-title {
        font-size: 0.26rem;
        color: #999999;
        position: absolute;
        top: 1.4rem;
        right: 0
    }

    /*历史行程样式结束*/
    .obd-header {
        display: flex;
        align-items: flex-end;
        background: #ffffff;
        margin-top: 0.2rem;
        position: relative;
        padding: 0.4rem 0 0 0.32rem
    }

    .obd-header > .obd-title-big {
        font-size: 0.34rem;
        color: #222222;
        font-weight: bold;
        line-height: 1;
    }

    .obd-header > .obd-title-small {
        font-size: 0.26rem;
        color: #888888;
        margin-left: 0.1rem;
        line-height: 1;
    }

    .obd-content {
        display: flex;
        background: #ffffff;
        padding: 0.24rem 0.32rem 0 0.32rem;
    }

    .obd-item {
        display: flex;
        flex-direction: column;
        flex: 1 0 0rem;
        align-items: center
    }

    .obd-item .icon {
        width: 0.32rem;
        height: 0.32rem;
        margin-left: 0.08rem
    }

    .obd-item .offset {
        margin-left: 0.08rem
    }
</style>
