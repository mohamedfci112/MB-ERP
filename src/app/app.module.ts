import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { LoginComponent } from './shared/login/login.component';
import { UserService } from './services/user.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PurchasesComponent } from './components/purchases/purchases.component';
import { SalesComponent } from './components/sales/sales.component';
import { CustomersComponent } from './components/customers/customers.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { ProductsComponent } from './components/products/products.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ManageComponent } from './components/manage/manage.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { TreasuryBankComponent } from './components/treasury-bank/treasury-bank.component';
import { HrComponent } from './components/hr/hr.component';
import { AddFatoraComponent } from './purchases/add-fatora/add-fatora.component';
import { PurchaseReportComponent } from './purchases/purchase-report/purchase-report.component';
import { PurchaseReturnComponent } from './purchases/purchase-return/purchase-return.component';
import { PurchaseReturnReportComponent } from './purchases/purchase-return-report/purchase-return-report.component';
import { AddSupplierComponent } from './suppliers/add-supplier/add-supplier.component';
import { SuppliersReportComponent } from './suppliers/suppliers-report/suppliers-report.component';
import { SuppliersAglRemainComponent } from './suppliers/suppliers-agl-remain/suppliers-agl-remain.component';
import { SuppliersMosdadComponent } from './suppliers/suppliers-mosdad/suppliers-mosdad.component';
import { EznSarfComponent } from './sales/ezn-sarf/ezn-sarf.component';
import { InvoiceComponent } from './sales/invoice/invoice.component';
import { SalesReportComponent } from './sales/sales-report/sales-report.component';
import { SalesReturnComponent } from './sales/sales-return/sales-return.component';
import { SalesReturnReportComponent } from './sales/sales-return-report/sales-return-report.component';
import { SalesArbahReportComponent } from './sales/sales-arbah-report/sales-arbah-report.component';
import { AddCustomerComponent } from './customers/add-customer/add-customer.component';
import { CustomerReportComponent } from './customers/customer-report/customer-report.component';
import { CustomersAgelRemainComponent } from './customers/customers-agel-remain/customers-agel-remain.component';
import { CustomersMosdadComponent } from './customers/customers-mosdad/customers-mosdad.component';
import { AddInventoryComponent } from './inventory/add-inventory/add-inventory.component';
import { GardInventoryComponent } from './inventory/gard-inventory/gard-inventory.component';
import { InventoryTransfersComponent } from './inventory/inventory-transfers/inventory-transfers.component';
import { InventoryTransfersReportComponent } from './inventory/inventory-transfers-report/inventory-transfers-report.component';
import { InventoryEditCostComponent } from './inventory/inventory-edit-cost/inventory-edit-cost.component';
import { InventoryEditQuantityComponent } from './inventory/inventory-edit-quantity/inventory-edit-quantity.component';
import { InventoryTalfComponent } from './inventory/inventory-talf/inventory-talf.component';
import { InventoryTalfReportComponent } from './inventory/inventory-talf-report/inventory-talf-report.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { HaraktSanfComponent } from './products/harakt-sanf/harakt-sanf.component';
import { WahdatElasnafComponent } from './products/wahdat-elasnaf/wahdat-elasnaf.component';
import { GroupsElasnafComponent } from './products/groups-elasnaf/groups-elasnaf.component';
import { MinProductsComponent } from './products/min-products/min-products.component';
import { AllProductsComponent } from './products/all-products/all-products.component';
import { AddTreasuryComponent } from './treasury_bank/add-treasury/add-treasury.component';
import { DepositTreasuryComponent } from './treasury_bank/deposit-treasury/deposit-treasury.component';
import { DepositBankComponent } from './treasury_bank/deposit-bank/deposit-bank.component';
import { SahbTreasuryComponent } from './treasury_bank/sahb-treasury/sahb-treasury.component';
import { SahbBankComponent } from './treasury_bank/sahb-bank/sahb-bank.component';
import { TreasuryTransfersComponent } from './treasury_bank/treasury-transfers/treasury-transfers.component';
import { TreasuryBankTransfersComponent } from './treasury_bank/treasury-bank-transfers/treasury-bank-transfers.component';
import { TreasuryBankCreditComponent } from './treasury_bank/treasury-bank-credit/treasury-bank-credit.component';
import { AddBankComponent } from './treasury_bank/add-bank/add-bank.component';
import { TreasuryDepositReportComponent } from './treasury_bank/reports/treasury-deposit-report/treasury-deposit-report.component';
import { BankDepositReportComponent } from './treasury_bank/reports/bank-deposit-report/bank-deposit-report.component';
import { TreasurySahbReportComponent } from './treasury_bank/reports/treasury-sahb-report/treasury-sahb-report.component';
import { BankSahbReportComponent } from './treasury_bank/reports/bank-sahb-report/bank-sahb-report.component';
import { TreasuryTransformReportComponent } from './treasury_bank/reports/treasury-transform-report/treasury-transform-report.component';
import { TreasuryBankTransformReportComponent } from './treasury_bank/reports/treasury-bank-transform-report/treasury-bank-transform-report.component';
import { AddEmployeeComponent } from './hr/add-employee/add-employee.component';
import { EmployeeSalaryComponent } from './hr/employee-salary/employee-salary.component';
import { AddSolfaComponent } from './hr/add-solfa/add-solfa.component';
import { PenaltiesComponent } from './hr/penalties/penalties.component';
import { SalariesReportComponent } from './hr/reports/salaries-report/salaries-report.component';
import { SolfaReportComponent } from './hr/reports/solfa-report/solfa-report.component';
import { MonthMashobatReportComponent } from './hr/reports/month-mashobat-report/month-mashobat-report.component';
import { PenaltiesReportComponent } from './hr/reports/penalties-report/penalties-report.component';
import { MasrofSandTaxComponent } from './components/masrof-sand-tax/masrof-sand-tax.component';
import { AddMasrofComponent } from './masrof_sand_tax/add-masrof/add-masrof.component';
import { ManageMasrofComponent } from './masrof_sand_tax/manage-masrof/manage-masrof.component';
import { MasrofReportComponent } from './masrof_sand_tax/masrof-report/masrof-report.component';
import { SandAbdComponent } from './masrof_sand_tax/sand-abd/sand-abd.component';
import { SandSrfComponent } from './masrof_sand_tax/sand-srf/sand-srf.component';
import { SandSrfAbdReportComponent } from './masrof_sand_tax/sand-srf-abd-report/sand-srf-abd-report.component';
import { TaxReportComponent } from './masrof_sand_tax/tax-report/tax-report.component';
import { GeneralAccountsComponent } from './components/general-accounts/general-accounts.component';
import { InventoryService } from './services/inventory.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { PushNotificationModule } from 'ng-push-notification';
import { TreasurybankService } from './services/treasurybank.service';
import { SupplierService } from './services/supplier.service';
import { CustomerService } from './services/customer.service';
import { EmployeeService } from './services/employee.service';
import { UnitsService } from './services/units.service';
import { ExpensesService } from './services/expenses.service';
import { DepartsService } from './services/departs.service';
import { DepartElasnafComponent } from './products/depart-elasnaf/depart-elasnaf.component';
import { ProductsService } from './services/products.service';
import { AdvancesService } from './services/advances.service';
import { SalariesService } from './services/salaries.service';
import { PurchasesService } from './services/purchases.service';
import { AgelSuppliersService } from './services/agel-suppliers.service';
import { OffersService } from './services/offers.service';
import { SalesService } from './services/sales.service';
import { SnadatService } from './services/snadat.service';
import { MosdadSuppliersService } from './services/mosdad-suppliers.service';
import { MosdadCustomersService } from './services/mosdad-customers.service';
import { AgelCustomersService } from './services/agel-customers.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { TableFilterPipe } from '../app/pipes/table-filter.pipe';
import { OfferFilterPipe } from '../app/pipes/offer-filter.pipe';
import { EznSrfFilterPipe } from '../app/pipes/eznsrf-filter.pipe';
import { AddOfferComponent } from './shourtcuts/add-offer/add-offer.component';
import { OffersComponent } from './shourtcuts/offers/offers.component';
import { OfferDetailsComponent } from './shourtcuts/offer-details/offer-details.component';
import { SandAbdCashComponent } from './masrof_sand_tax/sand-abd-cash/sand-abd-cash.component';
import { SandSrfCashComponent } from './masrof_sand_tax/sand-srf-cash/sand-srf-cash.component';
import { BarcodeComponent } from './barcode/barcode.component';
import { UsersComponent } from './managment/users/users.component';
import { AddUserComponent } from './managment/add-user/add-user.component';
import { UsersService } from './services/users.service';
import { PrivilegesComponent } from './managment/privileges/privileges.component';
import { SandSrfAbdReport1Component } from './masrof_sand_tax/sand-srf-abd-report1/sand-srf-abd-report1.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'login', component: LoginComponent},
  {path: 'purchases', component: PurchasesComponent},
  {path: 'sales', component: SalesComponent},
  {path: 'customers', component: CustomersComponent},
  {path: 'inventory', component: InventoryComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'reports', component: ReportsComponent},
  {path: 'manage', component: ManageComponent},
  {path: 'suppliers', component: SuppliersComponent},
  {path: 'treasury_bank', component: TreasuryBankComponent},
  {path: 'hr', component: HrComponent},
  {path: 'masrof_sand_taxt', component: MasrofSandTaxComponent},
  {path: 'general_accounts', component: GeneralAccountsComponent},
  {path: 'add_purchase_invoice', component: AddFatoraComponent},
  {path: 'purchase_report', component: PurchaseReportComponent},
  {path: 'purchase_return', component: PurchaseReturnComponent},
  {path: 'purchase_return_report', component: PurchaseReturnReportComponent},
  {path: 'add_supplier', component: AddSupplierComponent},
  {path: 'suppliers_report', component: SuppliersReportComponent},
  {path: 'suppliers_agel_remain', component: SuppliersAglRemainComponent},
  {path: 'suppliers_mosdad', component: SuppliersMosdadComponent},
  {path: 'ezn_sarf', component: EznSarfComponent},
  {path: 'invoice', component: InvoiceComponent},
  {path: 'sales_report', component: SalesReportComponent},
  {path: 'sales_return', component: SalesReturnComponent},
  {path: 'sales_return_report', component: SalesReturnReportComponent},
  {path: 'sales_arbah_report', component: SalesArbahReportComponent},
  {path: 'add_customer', component: AddCustomerComponent},
  {path: 'customer_report', component: CustomerReportComponent},
  {path: 'customers_agel_remain', component: CustomersAgelRemainComponent},
  {path: 'customers_mosdad', component: CustomersMosdadComponent},
  {path: 'add_inventory', component: AddInventoryComponent},
  {path: 'inventory_gard', component: GardInventoryComponent},
  {path: 'inventory_transfers', component: InventoryTransfersComponent},
  {path: 'inventory_transfers_report', component: InventoryTransfersReportComponent},
  {path: 'inventory_cost_edit', component: InventoryEditCostComponent},
  {path: 'inventory_quantity_edit', component: InventoryEditQuantityComponent},
  {path: 'inventory_talf', component: InventoryTalfComponent},
  {path: 'inventory_talf_report', component: InventoryTalfReportComponent},
  {path: 'add_product', component: AddProductComponent},
  {path: 'view_products', component: AllProductsComponent},
  {path: 'haraka_sanf', component: HaraktSanfComponent},
  {path: 'wahdat_elasnaf', component: WahdatElasnafComponent},
  {path: 'group_elasnaf', component: GroupsElasnafComponent},
  {path: 'depart_elasnaf', component: DepartElasnafComponent},
  {path: 'min_products', component: MinProductsComponent},
  {path: 'add_treasury', component: AddTreasuryComponent},
  {path: 'add_bank', component: AddBankComponent},
  {path: 'deposit_treasury', component: DepositTreasuryComponent},
  {path: 'deposit_bank', component: DepositBankComponent},
  {path: 'sahb_treasury', component: SahbTreasuryComponent},
  {path: 'sahb_bank', component: SahbBankComponent},
  {path: 'treasury_transfers', component: TreasuryTransfersComponent},
  {path: 'treasury_bank_transfers', component: TreasuryBankTransfersComponent},
  {path: 'treasury_bank_credit', component: TreasuryBankCreditComponent},
  {path: 'deposit_treasury_report', component: TreasuryDepositReportComponent},
  {path: 'deposit_bank_report', component: BankDepositReportComponent},
  {path: 'sahb_treasury_report', component: TreasurySahbReportComponent},
  {path: 'sahb_bank_report', component: BankSahbReportComponent},
  {path: 'treasury_transfers_report', component: TreasuryTransformReportComponent},
  {path: 'treasury_bank_transfers_report', component: TreasuryBankTransformReportComponent},
  {path: 'add_employee', component: AddEmployeeComponent},
  {path: 'employee_salary', component: EmployeeSalaryComponent},
  {path: 'add_solfa', component: AddSolfaComponent},
  {path: 'penalties', component: PenaltiesComponent},
  {path: 'salaries_report', component: SalariesReportComponent},
  {path: 'solfa_report', component: SolfaReportComponent},
  {path: 'month_mashobat_report', component: MonthMashobatReportComponent},
  {path: 'penalties_report', component: PenaltiesReportComponent},
  {path: 'add_masrof', component: AddMasrofComponent},
  {path: 'manage_masrof', component: ManageMasrofComponent},
  {path: 'masrof_report', component: MasrofReportComponent},
  {path: 'sand_abd', component: SandAbdComponent},
  {path: 'sand_abd_cash', component: SandAbdCashComponent},
  {path: 'sand_srf', component: SandSrfComponent},
  {path: 'sand_srf_cash', component: SandSrfCashComponent},
  {path: 'tax_report', component: TaxReportComponent},
  {path: 'srf_abd_report', component: SandSrfAbdReportComponent},
  {path: 'srf_abd_report1', component: SandSrfAbdReport1Component},
  {path: 'add_offer', component: AddOfferComponent},
  {path: 'offers', component: OffersComponent},
  {path: 'offer_details', component: OfferDetailsComponent},
  {path: 'generate_baecode', component: BarcodeComponent},
  {path: 'users', component: UsersComponent},
  {path: 'privileges', component: PrivilegesComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    TableFilterPipe,
    OfferFilterPipe,
    EznSrfFilterPipe,
    NavbarComponent,
    SidebarComponent,
    NavigationComponent,
    LoginComponent,
    PurchasesComponent,
    SalesComponent,
    CustomersComponent,
    InventoryComponent,
    ProductsComponent,
    ReportsComponent,
    ManageComponent,
    SuppliersComponent,
    TreasuryBankComponent,
    HrComponent,
    AddFatoraComponent,
    PurchaseReportComponent,
    PurchaseReturnComponent,
    PurchaseReturnReportComponent,
    AddSupplierComponent,
    SuppliersReportComponent,
    SuppliersAglRemainComponent,
    SuppliersMosdadComponent,
    EznSarfComponent,
    InvoiceComponent,
    SalesReportComponent,
    SalesReturnComponent,
    SalesReturnReportComponent,
    SalesArbahReportComponent,
    AddCustomerComponent,
    CustomerReportComponent,
    CustomersAgelRemainComponent,
    CustomersMosdadComponent,
    AddInventoryComponent,
    GardInventoryComponent,
    InventoryTransfersComponent,
    InventoryTransfersReportComponent,
    InventoryEditCostComponent,
    InventoryEditQuantityComponent,
    InventoryTalfComponent,
    InventoryTalfReportComponent,
    AddProductComponent,
    HaraktSanfComponent,
    WahdatElasnafComponent,
    GroupsElasnafComponent,
    MinProductsComponent,
    AllProductsComponent,
    AddTreasuryComponent,
    DepositTreasuryComponent,
    DepositBankComponent,
    SahbTreasuryComponent,
    SahbBankComponent,
    TreasuryTransfersComponent,
    TreasuryBankTransfersComponent,
    TreasuryBankCreditComponent,
    AddBankComponent,
    TreasuryDepositReportComponent,
    BankDepositReportComponent,
    TreasurySahbReportComponent,
    BankSahbReportComponent,
    TreasuryTransformReportComponent,
    TreasuryBankTransformReportComponent,
    AddEmployeeComponent,
    EmployeeSalaryComponent,
    AddSolfaComponent,
    PenaltiesComponent,
    SalariesReportComponent,
    SolfaReportComponent,
    MonthMashobatReportComponent,
    PenaltiesReportComponent,
    MasrofSandTaxComponent,
    AddMasrofComponent,
    ManageMasrofComponent,
    MasrofReportComponent,
    SandAbdComponent,
    SandSrfComponent,
    SandSrfAbdReportComponent,
    TaxReportComponent,
    GeneralAccountsComponent,
    DepartElasnafComponent,
    AddOfferComponent,
    OffersComponent,
    OfferDetailsComponent,
    SandAbdCashComponent,
    SandSrfCashComponent,
    BarcodeComponent,
    UsersComponent,
    AddUserComponent,
    PrivilegesComponent,
    SandSrfAbdReport1Component
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule,
    PushNotificationModule.forRoot(),
    NgxPaginationModule,
  ],
  providers: [
    UserService,
    InventoryService,
    TreasurybankService,
    SupplierService,
    CustomerService,
    EmployeeService,
    UnitsService,
    ExpensesService,
    DepartsService,
    ProductsService,
    AdvancesService,
    SalariesService,
    PurchasesService,
    AgelSuppliersService,
    OffersService,
    SalesService,
    AgelCustomersService,
    SnadatService,
    MosdadSuppliersService,
    MosdadCustomersService,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
