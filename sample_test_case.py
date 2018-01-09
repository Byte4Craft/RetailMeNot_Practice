"""
Sample test case for learning purposes
"""

import unittest
from selenium import webdriver
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By

class RetailMeNotGenie(unittest.TestCase):
    """ Test class for the RetailMeNot Genie project"""

    def setUp(self):
        """ Set up browser environment and install the Genie extension"""

        chrome_options = webdriver.ChromeOptions()
        chrome_options.add_extension('./RetailMeNot-Genie_v1.0.324.crx')
        self.driver = webdriver.Chrome(chrome_options=chrome_options)

    def test_bathandbodyworkscom(self):
        """Test www.bathandbodyworks.com website"""

        def genie_popup(timeout=10, popup_id="__genie_container"):
            """
            Returns the popup from the Genie extension

            :param timeout: timeout while searching for the popup
            :type timeout: int

            :param popup_id: id of the popup to search for
            :type popup_id: str

            :return: Object, representing the popup or None
            """

            try:
                WebDriverWait(driver, timeout).until(
                    expected_conditions.presence_of_element_located((By.ID, popup_id)))
                return driver.execute_script(
                    'return document.querySelector("#{}").shadowRoot'.format(popup_id))
            except TimeoutException:
                pass #Logger? Console message?

        def genie_scan_finished(timeout=30):
            """
            Returns the status of the Genie code scan process

            :param timeout: time to wait for the Genie scan to finish
            :type timeout: int

            :return: True if scan has been finished or None
            """

            try:
                WebDriverWait(driver, timeout).until_not(
                    lambda _: genie_popup().find_element(By.ID, "__rmnGenieChecking"))
                return True
            except TimeoutException:
                pass

        def item_added_popup():
            """
            Get the 'Item Added' website popup window object

            :return: Object, representing the popup or None
            """

            try:
                WebDriverWait(driver, 5).until(expected_conditions.presence_of_element_located(
                    (By.CSS_SELECTOR, '.ui-dialog.ui-widget.ui-widget-content')))
                return driver.find_element(By.CSS_SELECTOR, '.ui-dialog.ui-widget')
            except TimeoutException:
                pass

        driver = self.driver
        driver.maximize_window()
        driver.get("http://www.bathandbodyworks.com/")

        # Close the first Genie popup window
        genie_firstmessage_popup = genie_popup()
        if genie_firstmessage_popup:
            got_it_link = genie_firstmessage_popup.find_element(By.CLASS_NAME, "dismiss-message")
            got_it_link.click()

        #move mouse over HAND SOAPS
        hand_soaps_button = driver.find_element(By.CLASS_NAME, 'hand-soaps')
        ActionChains(driver).move_to_element(hand_soaps_button).perform()

        # select Nourishing Soap section
        WebDriverWait(driver, 5).until(expected_conditions.presence_of_element_located(
            (By.LINK_TEXT, 'Nourishing Soap')))
        gel_soap_button = driver.find_element_by_link_text('Nourishing Soap')
        gel_soap_button.click()

        #Click on Warm Vanilla Sugar $3
        warm_vanilla_sugar_soap = driver.find_elements(By.CLASS_NAME, 'product-name')[2]
        warm_vanilla_sugar_soap.click()

        #Close the popup if it appears / Event handler? In case the pop up appears in another place?
        try:
            WebDriverWait(driver, 3).until(expected_conditions.presence_of_element_located(
                (By.LINK_TEXT, 'No, thanks')))
            no_thanks_popup_button = driver.find_element(By.LINK_TEXT, 'No, thanks')
            no_thanks_popup_button.click()
        except TimeoutException:
            pass #Logger? Console message?

        #increase quantity of the products by one
        quantity_increase_button = driver.find_element(By.CSS_SELECTOR, '.quantity-button.increase')
        quantity_increase_button.click()

        #AddToBag
        add_to_cart_button = driver.find_element(By.CLASS_NAME, 'add-to-cart')
        add_to_cart_button.click()

        #ClosePopup after adding to cart
        item_in_the_bag_popup = item_added_popup()
        if item_in_the_bag_popup:
            close_button = item_in_the_bag_popup.find_element(By.CLASS_NAME, 'ui-icon-closethick')
            close_button.click()

        #Go to the previous page
        driver.back()

        #Click on Core Soap $15
        core_soap = driver.find_elements(By.CLASS_NAME, 'product-name')[20]
        core_soap.click()

        #AddToBag
        add_to_cart_button = driver.find_element(By.CLASS_NAME, 'add-to-cart')
        add_to_cart_button.click()

        # ClosePopup after adding to cart
        core_soap_in_the_bag_popup = item_added_popup()
        if core_soap_in_the_bag_popup:
            view_bag_button = core_soap_in_the_bag_popup.find_elements(
                By.CLASS_NAME, 'ui-button-text')[2]
            view_bag_button.click()

        #Verify Order Total
        merchandise_subtotal = float(driver.find_element(By.CLASS_NAME, 'order-subtotal').text[-5:])
        order_total = float(driver.find_element(By.CLASS_NAME, 'order-value').text[-5:])

        self.assertEqual(21.0, merchandise_subtotal)
        self.assertEqual(29.69, order_total)

        #Find Genie extension popup
        genie_codesfound_popup = genie_popup()
        applysavings_button = genie_codesfound_popup.find_element(
            By.CSS_SELECTOR, ".rmnGenie-button.qa-test-codes")
        applysavings_button.click()

        #Click on Apply Savings

        if genie_scan_finished(30):
            genie_scanresults_popup = genie_popup()
            code_applied = genie_scanresults_popup.find_element(
                By.CSS_SELECTOR, ".solvedCodeText").text
            gotocheckout_button = genie_scanresults_popup.find_element(
                By.CSS_SELECTOR, ".qa-go-to-checkout")
            gotocheckout_button.click()

        #Get new Merchandise Subtotal and Order Total values
        order_discount = float(driver.find_element(By.CLASS_NAME, 'order-discount').text[-4:])
        new_order_total = float(driver.find_element(By.CLASS_NAME, 'order-value').text[-5:])

        #Verify the applied code, merchandise and order total
        self.assertEqual('DISCOVER20', code_applied)
        self.assertEqual(4.2, order_discount)
        self.assertEqual(25.07, new_order_total)

    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()
