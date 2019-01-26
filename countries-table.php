<?php function temp_table($country, $rows = 10) { ?>
<table class="temp-table <?php echo $country ?>" id = "temp-table <?php echo $country ?>">
    <thead>
    <tr1>
        <th>Nr.</th>
        <th>Place</th>
        <th>Windchill</th>
    </tr1>
    </thead>
    <?php for ($i = 0; $i < $rows; $i++) { ?>
        <tbody>
    <tr>
        <td></td>
        <td></td>
        <td></td>
    </tr>
        </tbody>
    <?php } ?>

</table>
<?php } ?>

